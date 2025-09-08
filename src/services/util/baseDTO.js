import { objectTypesMatch } from '../../util/Validation';

export default class BaseDTO {
    constructor() {
        if (new.target === BaseDTO) {
            throw new Error('BaseDTO é abstrata e não pode ser instanciada diretamente.');
        }
    }

    static #schemaWithNull() {
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

    static isValid(obj) {
        return objectTypesMatch(this.#schemaWithNull(), obj);
    }

    isValid() {
        return this.constructor.isValid(this);
    }

    static fromJson(json) {
        const obj = (typeof json === 'string') ? JSON.parse(json) : json;

        if (!this.isValid(obj)) {
            throw new Error(`JSON inválido para ${this.name}`);
        }

        // Conversão automática de datas
        const parsedObj = { ...obj };
        for (const [key, types] of Object.entries(this.#schemaWithNull())) {
            if (types.includes('date') && typeof parsedObj[key] === 'string') {
                parsedObj[key] = new Date(parsedObj[key]);
            }
        }

        return new this(...Object.values(parsedObj));
    }
}