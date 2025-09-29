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
    // Validation.isType([{id: 1}], ['array', SomeDTO]); // validates array of SomeDTO
    static isType(value, type, acceptNulls = true) {
        if (Array.isArray(type)) {
            // Verifica se é um array tipado (primeiro elemento é 'array')
            if (type.length >= 2 && type[0] === 'array') {
                // Se o valor não é um array, verifica se é um dos tipos alternativos (null, undefined, etc.)
                if (!Array.isArray(value)) {
                    const alternativeTypes = type.slice(1).filter(t => t !== type[1]); // Remove o tipo principal do elemento
                    return alternativeTypes.length > 0 && alternativeTypes.some(t => Validation.isType(value, t, acceptNulls));
                }
                // Se é um array, valida cada elemento com os tipos válidos
                const elementTypes = type.length === 2 ? type[1] : type.slice(1);
                return value.every(item => Validation.isType(item, elementTypes, acceptNulls));
            }
            // Comportamento original para múltiplos tipos aceitos
            return type.some(t => Validation.isType(value, t, acceptNulls));
        }

        if (typeof type === 'string') {
            switch (type.toLowerCase()) {
                case 'string': return typeof value === 'string';
                case 'number': return typeof value === 'number' && !Number.isNaN(value);
                case 'boolean': return typeof value === 'boolean';
                case 'array': return Array.isArray(value);
                case 'object': return value !== null && typeof value === 'object' && !Array.isArray(value);
                case 'function': return typeof value === 'function';
                case 'date': 
                    // Aceita Date objects OU strings que podem ser convertidas para Date
                    return (value instanceof Date && !isNaN(value.valueOf())) || typeof value === 'string';
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
            
            // Verifica se o valor é uma instância válida do DTO (propaga acceptNulls)
            if (value && typeof value === 'object' && typeof type.isValid === 'function') {
                return type.isValid(value, acceptNulls);
            }
            
            return value instanceof type;
        }

        return false;
    }

    // Example usage:
    // const schema = { name: 'string', age: 'number', isActive: ['boolean', 'null'] };
    // const obj = { name: 'John', age: 30, isActive: true };
    // Validation.objectTypesMatch(schema, obj); // true
    static objectTypesMatch(schema, obj, acceptNulls = true) {
        if (!schema || typeof schema !== 'object') throw new Error('Schema inválido');
        if (!obj || typeof obj !== 'object') {
            console.error('Objeto inválido para validação');
            console.error(obj);
            throw new Error('Objeto inválido');
        } 

        return Object.keys(schema).every((key) => {
            const expected = schema[key];
            
            // Se a chave não existe no objeto
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                // Com acceptNulls=true e schema aceita null, trate como null
                if (acceptNulls) {
                    const typesArr = Array.isArray(expected) ? expected : [expected];
                    if (typesArr.includes('null')) {
                        return true; // Campo ausente é válido quando null é aceito
                    }
                }
                console.error(`Chave ausente: ${key}`);
                console.error(obj);
                return false;
            }
            
            const isValid = Validation.isType(obj[key], expected, acceptNulls);
            if (!isValid) {
                console.error(`Validação falhou para chave "${key}":`, {
                    expected,
                    received: obj[key],
                    receivedType: typeof obj[key],
                    acceptNulls
                });
            }
            return isValid;
        });
    }
}

export const isEmail = Validation.isEmail;
export const objectHasAllAttributes = Validation.objectHasAllAttributes;
export const jsonHasAllAttributes = Validation.jsonHasAllAttributes;
export const isType = Validation.isType;
export const objectTypesMatch = Validation.objectTypesMatch;
export default Validation;