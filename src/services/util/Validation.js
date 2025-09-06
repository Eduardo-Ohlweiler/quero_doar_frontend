export default class Validation {
    static isEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static objectHasAllAttributes(attributesNames, obj) {
        if(!obj || typeof obj !== 'object') {
            return false;
        }
        return attributesNames.every(attr => obj.hasOwnProperty(attr) && obj[attr] !== undefined);
    }

    static jsonHasAllAttributes(attributesNames, json) {
        try {
            const obj = JSON.parse(json);
            return this.objectHasAllAttributes(attributesNames, obj);
        } catch (e) {
            return false;
        }
    }

    static isType(value, type) {
        if (Array.isArray(type)) {
            return type.some(t => this.isType(value, t));
        }

        if (typeof type === 'string') {
            switch (type.toLowerCase()) {
                case 'string': return typeof value === 'string';
                case 'number': return typeof value === 'number' && !Number.isNaN(value);
                case 'boolean': return typeof value === 'boolean';
                case 'array': return Array.isArray(value);
                case 'object': return value !== null && typeof value === 'object' && !Array.isArray(value);
                case 'function': return typeof value === 'function';
                case 'date': return value instanceof Date && !isNaN(value.valueOf());
                case 'null': return value === null;
                case 'undefined': return value === undefined;
                case 'nan': return Number.isNaN(value);
                case 'symbol': return typeof value === 'symbol';
                default: return false;
            }
        }

        if (typeof type === 'function') {
            // handle primitive constructors
            if (type === String) return typeof value === 'string';
            if (type === Number) return typeof value === 'number' && !Number.isNaN(value);
            if (type === Boolean) return typeof value === 'boolean';
            if (type === Array) return Array.isArray(value);
            if (type === Object) return value !== null && typeof value === 'object' && !Array.isArray(value);
            if (type === Date) return value instanceof Date && !isNaN(value.valueOf());
            // fallback to instanceof for custom classes
            return value instanceof type;
        }

        return false;
    }

    // valida um objeto contra um schema de tipos
    // schema example: { street: 'string', number: ['string','null'], tags: Array, meta: Object }
    static objectTypesMatch(schema, obj) {
        if (!schema || typeof schema !== 'object') throw new Error('Schema inválido');
        if (!obj || typeof obj !== 'object') throw new Error('Objeto inválido');

        return Object.keys(schema).every((key) => {
            const expected = schema[key];
            // se a propriedade não existe no objeto, considera inválido
            if (!Object.prototype.hasOwnProperty.call(obj, key)) return false;
            return this.isType(obj[key], expected);
        });
    }

    //TODO: Validar no backend os requisitos de senha
    // static isPassword(password) {
    //     // Pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial
    //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //     return passwordRegex.test(password);
    // }

}