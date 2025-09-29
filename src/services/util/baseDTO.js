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
                if (!arr.includes('undefined')) {
                    arr.push('undefined');
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
            
            // Conversão de arrays tipados - verifica se contém 'array' nos tipos
            if (typesArr.includes('array') && Array.isArray(value)) {
                // Procura por DTOs nos tipos do array (ignora 'array', 'null', 'undefined', etc.)
                const dtoType = typesArr.find(type => typeof type === 'function' && type.fromJson);
                if (dtoType) {
                    parsedObj[key] = value.map(item => {
                        if (item === null || item === undefined) return item;
                        if (typeof item === 'object' && !Array.isArray(item)) {
                            return dtoType.fromJson(item, acceptNulls);
                        }
                        return item;
                    });
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