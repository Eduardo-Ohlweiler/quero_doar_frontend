import { objectTypesMatch } from "./Validation";

export default class BaseDTO {
    constructor() {
        if (new.target === BaseDTO) {
            throw new Error('BaseDTO é abstrata e não pode ser instanciada diretamente.');
        }
    }

    static schemaWithNull() {
        if (!this.schema) {
            throw new Error(`A classe ${this.name} não declarou static schema`);
        }
        return Object.fromEntries(
            Object.entries(this.schema).map(([key, types]) => {
                const arr = Array.isArray(types) ? [...types] : [types];
                if (!arr.includes('null')) {
                    arr.push('null');
                }
                return [key, arr];
            })
        );
    }

    static isValid(obj, acceptNulls = true) {
        const schema = acceptNulls ? this.schemaWithNull() : this.schema;
        return objectTypesMatch(schema, obj, acceptNulls);
    }

    isValid(acceptNulls = true) {
        return this.constructor.isValid(this, acceptNulls);
    }

    static fromJson(json, acceptNulls = false) {
        const obj = (typeof json === 'string') ? JSON.parse(json) : json;

        if (!this.isValid(obj, acceptNulls)) {
            throw new Error(`JSON inválido para ${this.name}`);
        }

        // Conversão automática de datas, arrays de DTOs e DTOs aninhados
        const parsedObj = { ...obj };
        
        for (const [key, types] of Object.entries(this.schema)) { // Sempre usar schema original
            const value = parsedObj[key];
            
            // Pular apenas null/undefined, não false/0/""
            if (value === null || value === undefined) continue;
            
            // Normalizar tipos para array
            const typesArr = Array.isArray(types) ? types : [types];
            
            // Conversão de datas
            if (typesArr.includes('date') && typeof value === 'string') {
                parsedObj[key] = new Date(value);
                continue;
            }
            
            // Conversão de arrays tipados - verifica se o primeiro elemento é 'array'
            if (typesArr.length === 2 && typesArr[0] === 'array' && Array.isArray(value)) {
                const elementType = typesArr[1];
                if (typeof elementType === 'function' && elementType.fromJson) {
                    parsedObj[key] = value.map(item => elementType.fromJson(item, acceptNulls));
                }
                continue;
            }
            
            // Conversão de DTOs aninhados
            for (const type of typesArr) {
                if (typeof type === 'function' && type.fromJson && typeof value === 'object' && !Array.isArray(value)) {
                    parsedObj[key] = type.fromJson(value, acceptNulls);
                    break;
                }
            }
        }

        return Object.assign(new this(), parsedObj);
    }
}