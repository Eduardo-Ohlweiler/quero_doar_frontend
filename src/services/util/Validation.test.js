import { describe, it, expect } from 'vitest';
import Validation, { isType, objectTypesMatch } from './Validation.js';
import BaseDTO from './baseDTO.js';

// DTOs para teste
class PersonDTO extends BaseDTO {
    constructor() {
        super();
        this.id = null;
        this.name = null;
        this.email = null;
        this.isActive = null;
        this.birthDate = null;
        this.metadata = null;
    }

    static schema = {
        id: ['number'],
        name: ['string'],
        email: ['string'],
        isActive: ['boolean'],
        birthDate: ['date'],
        metadata: ['object', 'null']
    };
}

describe('Validation Tests', () => {
    
    describe('Validation.isType - Primitivos', () => {
        it('deve validar tipos string corretamente', () => {
            expect(isType('hello', 'string')).toBe(true);
            expect(isType('', 'string')).toBe(true);
            expect(isType(123, 'string')).toBe(false);
            expect(isType(null, 'string')).toBe(false);
        });

        it('deve validar tipos number corretamente', () => {
            expect(isType(123, 'number')).toBe(true);
            expect(isType(0, 'number')).toBe(true);
            expect(isType(-42, 'number')).toBe(true);
            expect(isType(3.14, 'number')).toBe(true);
            expect(isType(NaN, 'number')).toBe(false);
            expect(isType('123', 'number')).toBe(false);
        });

        it('deve validar tipos boolean corretamente', () => {
            expect(isType(true, 'boolean')).toBe(true);
            expect(isType(false, 'boolean')).toBe(true);
            expect(isType(0, 'boolean')).toBe(false);
            expect(isType(1, 'boolean')).toBe(false);
            expect(isType('true', 'boolean')).toBe(false);
        });

        it('deve validar tipos date corretamente', () => {
            expect(isType(new Date(), 'date')).toBe(true);
            expect(isType('2023-01-01', 'date')).toBe(true); // String aceita
            expect(isType('invalid-date', 'date')).toBe(true); // String ainda aceita
            expect(isType(123456789, 'date')).toBe(false);
        });

        it('deve validar null e undefined', () => {
            expect(isType(null, 'null')).toBe(true);
            expect(isType(undefined, 'null')).toBe(false);
            expect(isType(null, 'undefined')).toBe(false);
            expect(isType(undefined, 'undefined')).toBe(true);
        });

        it('deve validar arrays', () => {
            expect(isType([], 'array')).toBe(true);
            expect(isType([1, 2, 3], 'array')).toBe(true);
            expect(isType({}, 'array')).toBe(false);
            expect(isType('[]', 'array')).toBe(false);
        });

        it('deve validar objects', () => {
            expect(isType({}, 'object')).toBe(true);
            expect(isType({ a: 1 }, 'object')).toBe(true);
            expect(isType([], 'object')).toBe(false);
            expect(isType(null, 'object')).toBe(false);
        });
    });

    describe('Validation.isType - Múltiplos tipos', () => {
        it('deve aceitar múltiplos tipos válidos', () => {
            expect(isType('text', ['string', 'number'])).toBe(true);
            expect(isType(42, ['string', 'number'])).toBe(true);
            expect(isType(true, ['string', 'number'])).toBe(false);
        });

        it('deve propagar acceptNulls para múltiplos tipos', () => {
            expect(isType(null, ['string', 'null'], true)).toBe(true);
            expect(isType(null, ['string'], false)).toBe(false);
        });
    });

    describe('Validation.isType - Arrays tipados', () => {
        it('deve validar arrays tipados vazios', () => {
            expect(isType([], ['array', 'string'])).toBe(true);
            expect(isType([], ['array', PersonDTO])).toBe(true);
        });

        it('deve validar arrays de strings', () => {
            expect(isType(['a', 'b', 'c'], ['array', 'string'])).toBe(true);
            expect(isType(['a', 123, 'c'], ['array', 'string'])).toBe(false);
        });

        it('deve validar arrays de números', () => {
            expect(isType([1, 2, 3], ['array', 'number'])).toBe(true);
            expect(isType([1, 'two', 3], ['array', 'number'])).toBe(false);
        });

        it('deve validar arrays de DTOs com acceptNulls', () => {
            const validPersons = [
                { id: 1, name: 'John', email: 'john@test.com', isActive: true, birthDate: '2000-01-01', metadata: null },
                { id: 2, name: 'Jane', email: 'jane@test.com', isActive: false, birthDate: '1995-05-15', metadata: {} }
            ];
            
            expect(isType(validPersons, ['array', PersonDTO], true)).toBe(true);
            
            const invalidPersons = [
                { id: 1, name: 'John', email: 'john@test.com', isActive: true, birthDate: '2000-01-01', metadata: null },
                { id: null, name: 'Jane', email: 'jane@test.com', isActive: false, birthDate: '1995-05-15', metadata: {} } // id null
            ];
            
            expect(isType(invalidPersons, ['array', PersonDTO], false)).toBe(false);
            expect(isType(invalidPersons, ['array', PersonDTO], true)).toBe(true);
        });
    });

    describe('Validation.isType - DTOs', () => {
        it('deve validar DTOs com acceptNulls=true', () => {
            const validPerson = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                isActive: true,
                birthDate: '1990-01-01',
                metadata: null
            };

            expect(isType(validPerson, PersonDTO, true)).toBe(true);
        });

        it('deve validar DTOs com acceptNulls=false', () => {
            const validPerson = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                isActive: true,
                birthDate: '1990-01-01',
                metadata: {}
            };

            const invalidPerson = {
                id: null, // não deveria ser null com acceptNulls=false
                name: 'John Doe',
                email: 'john@example.com',
                isActive: true,
                birthDate: '1990-01-01',
                metadata: {}
            };

            expect(isType(validPerson, PersonDTO, false)).toBe(true);
            expect(isType(invalidPerson, PersonDTO, false)).toBe(false);
        });
    });

    describe('Validation.isType - AcceptNulls behavior', () => {
        it('deve aceitar null quando acceptNulls=true para tipos que incluem null', () => {
            expect(isType(null, ['string', 'null'], true)).toBe(true);
            expect(isType(null, ['number', 'null'], true)).toBe(true);
            expect(isType(null, ['boolean', 'null'], true)).toBe(true);
        });

        it('deve rejeitar null quando acceptNulls=false', () => {
            expect(isType(null, 'string', false)).toBe(false);
            expect(isType(null, 'number', false)).toBe(false);
            expect(isType(null, 'boolean', false)).toBe(false);
        });

        it('deve aceitar undefined quando acceptNulls=true para tipos que incluem undefined', () => {
            expect(isType(undefined, ['string', 'undefined'], true)).toBe(true);
            expect(isType(undefined, ['number', 'undefined'], true)).toBe(true);
            expect(isType(undefined, ['boolean', 'undefined'], true)).toBe(true);
        });

        it('deve rejeitar undefined quando acceptNulls=false', () => {
            expect(isType(undefined, 'string', false)).toBe(false);
            expect(isType(undefined, 'number', false)).toBe(false);
            expect(isType(undefined, 'boolean', false)).toBe(false);
        });
    });

    describe('Validation.objectTypesMatch', () => {
        it('deve validar objetos simples com schema válido', () => {
            const obj = {
                name: 'John',
                age: 30,
                active: true
            };

            const schema = {
                name: ['string'],
                age: ['number'],
                active: ['boolean']
            };

            expect(objectTypesMatch(schema, obj, false)).toBe(true);
        });

        it('deve invalidar objetos com tipos incorretos', () => {
            const obj = {
                name: 'John',
                age: 'thirty', // Tipo incorreto
                active: true
            };

            const schema = {
                name: ['string'],
                age: ['number'],
                active: ['boolean']
            };

            expect(objectTypesMatch(schema, obj, false)).toBe(false);
        });

        it('deve validar objetos com campos opcionais quando acceptNulls=true', () => {
            const obj = {
                name: 'John',
                age: null // Campo opcional
            };

            const schema = {
                name: ['string'],
                age: ['number', 'null'],
                active: ['boolean', 'null']
            };

            expect(objectTypesMatch(schema, obj, true)).toBe(true);
        });

        it('deve invalidar objetos com campos null quando acceptNulls=false', () => {
            const obj = {
                name: 'John',
                age: null // Campo null não aceito
            };

            const schema = {
                name: ['string'],
                age: ['number']
            };

            expect(objectTypesMatch(schema, obj, false)).toBe(false);
        });

        it('deve propagar acceptNulls para objetos aninhados', () => {
            const obj = {
                person: {
                    id: null, // Null em objeto aninhado
                    name: 'John',
                    email: 'john@test.com',
                    isActive: true,
                    birthDate: '1990-01-01',
                    metadata: null
                }
            };

            const schema = {
                person: [PersonDTO]
            };

            expect(objectTypesMatch(schema, obj, true)).toBe(true);
            expect(objectTypesMatch(schema, obj, false)).toBe(false);
        });
    });

    describe('Validation - Edge Cases', () => {
        it('deve lidar com valores falsy corretamente', () => {
            // Valores falsy que devem ser aceitos quando o tipo está correto
            expect(isType(false, 'boolean')).toBe(true);
            expect(isType(0, 'number')).toBe(true);
            expect(isType('', 'string')).toBe(true);
            expect(isType([], 'array')).toBe(true);
        });

        it('deve normalizar tipos únicos para arrays', () => {
            // O sistema deve aceitar tanto 'string' quanto ['string']
            expect(isType('test', 'string')).toBe(true);
            expect(isType('test', ['string'])).toBe(true);
        });

        it('deve validar arrays vazios corretamente', () => {
            expect(isType([], ['array', 'string'])).toBe(true);
            expect(isType([], ['array', 'number'])).toBe(true);
            expect(isType([], ['array', PersonDTO])).toBe(true);
        });
    });
});