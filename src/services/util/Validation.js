class Validation {
    static isEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static objectHasAllAttributes(attributesNames, obj) {
        if (!obj || typeof obj !== 'object') {
            return false;
        }
        return attributesNames.every(attr => Object.prototype.hasOwnProperty.call(obj, attr) && obj[attr] !== undefined);
    }

    static jsonHasAllAttributes(attributesNames, json) {
        try {
            const obj = JSON.parse(json);
            return Validation.objectHasAllAttributes(attributesNames, obj);
        } catch (e) {
            return false;
        }
    }

    // Example usage:
    // Validation.isType('hello', 'string'); // true
    static isType(value, type) {
        if (Array.isArray(type)) {
            return type.some(t => Validation.isType(value, t));
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
            if (type === String) return typeof value === 'string';
            if (type === Number) return typeof value === 'number' && !Number.isNaN(value);
            if (type === Boolean) return typeof value === 'boolean';
            if (type === Array) return Array.isArray(value);
            if (type === Object) return value !== null && typeof value === 'object' && !Array.isArray(value);
            if (type === Date) return value instanceof Date && !isNaN(value.valueOf());
            return value instanceof type;
        }

        return false;
    }

    // Example usage:
    // const schema = { name: 'string', age: 'number', isActive: ['boolean', 'null'] };
    // const obj = { name: 'John', age: 30, isActive: true };
    // Validation.objectTypesMatch(schema, obj); // true
    static objectTypesMatch(schema, obj) {
        if (!schema || typeof schema !== 'object') throw new Error('Schema inválido');
        if (!obj || typeof obj !== 'object') throw new Error('Objeto inválido');

        return Object.keys(schema).every((key) => {
            const expected = schema[key];
            if (!Object.prototype.hasOwnProperty.call(obj, key)) return false;
            return Validation.isType(obj[key], expected);
        });
    }
}

export const isEmail = Validation.isEmail;
export const objectHasAllAttributes = Validation.objectHasAllAttributes;
export const jsonHasAllAttributes = Validation.jsonHasAllAttributes;
export const isType = Validation.isType;
export const objectTypesMatch = Validation.objectTypesMatch;
export default Validation;