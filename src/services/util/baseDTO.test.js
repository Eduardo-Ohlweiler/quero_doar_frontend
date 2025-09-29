import { describe, it, expect } from 'vitest';
import BaseDTO from './baseDTO.js';

// DTOs para teste - declarados em ordem para evitar problemas de referência

class Level2DTO extends BaseDTO {
    constructor() {
        super();
        this.deepValue = null;
        this.flag = null;
    }

    static schema = {
        deepValue: ['number'],
        flag: ['boolean']
    };
}

class Level1DTO extends BaseDTO {
    constructor() {
        super();
        this.value = null;
        this.level2 = null;
    }

    static schema = {
        value: ['string'],
        level2: [Level2DTO]
    };
}

class NestedTestDTO extends BaseDTO {
    constructor() {
        super();
        this.level1 = null;
    }

    static schema = {
        level1: [Level1DTO]
    };
}

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

class CompanyDTO extends BaseDTO {
    constructor() {
        super();
        this.id = null;
        this.name = null;
        this.owner = null;
        this.employees = null;
    }

    static schema = {
        id: ['number'],
        name: ['string'],
        owner: [PersonDTO],
        employees: ['array', PersonDTO]
    };
}

// DTO para testar arrays com múltiplos tipos
class ArrayWithMultipleTypesDTO extends BaseDTO {
    constructor() {
        super();
        this.tags = null;
        this.categories = null;
        this.optionalItems = null;
    }

    static schema = {
        tags: ['array', 'string', 'null'],           // Array de strings OU null
        categories: ['array', 'string', 'null', 'undefined'], // Array de strings OU null OU undefined
        optionalItems: ['null', 'undefined', 'array', PersonDTO] // Ordem diferentes + DTO
    };
}

describe('BaseDTO Tests', () => {
    
    describe('BaseDTO.fromJson - Arrays com múltiplos tipos', () => {
        it('deve validar e converter arrays com null como alternativa', () => {
            const validData1 = {
                tags: ['tag1', 'tag2'],
                categories: ['cat1', 'cat2'],
                optionalItems: null
            };
            
            const dto1 = ArrayWithMultipleTypesDTO.fromJson(validData1, false);
            expect(dto1).toBeInstanceOf(ArrayWithMultipleTypesDTO);
            expect(dto1.tags).toEqual(['tag1', 'tag2']);
            expect(dto1.categories).toEqual(['cat1', 'cat2']);
            expect(dto1.optionalItems).toBe(null);
        });

        it('deve aceitar null como valor principal do campo', () => {
            const validData2 = {
                tags: null,
                categories: undefined,
                optionalItems: null
            };
            
            const dto2 = ArrayWithMultipleTypesDTO.fromJson(validData2, false);
            expect(dto2).toBeInstanceOf(ArrayWithMultipleTypesDTO);
            expect(dto2.tags).toBe(null);
            expect(dto2.categories).toBe(undefined);
            expect(dto2.optionalItems).toBe(null);
        });

        it('deve aceitar arrays com elementos null/undefined', () => {
            const validData3 = {
                tags: ['tag1', null, 'tag3'],
                categories: ['cat1', undefined, null, 'cat4'],
                optionalItems: [
                    { id: 1, name: 'John', email: 'john@test.com', isActive: true, birthDate: '2000-01-01', metadata: null },
                    null,
                    undefined
                ]
            };
            
            const dto3 = ArrayWithMultipleTypesDTO.fromJson(validData3, true);
            expect(dto3).toBeInstanceOf(ArrayWithMultipleTypesDTO);
            expect(dto3.tags).toEqual(['tag1', null, 'tag3']);
            expect(dto3.categories).toEqual(['cat1', undefined, null, 'cat4']);
            expect(dto3.optionalItems).toHaveLength(3);
            expect(dto3.optionalItems[0]).toBeInstanceOf(PersonDTO);
            expect(dto3.optionalItems[1]).toBe(null);
            expect(dto3.optionalItems[2]).toBe(undefined);
        });

        it('deve rejeitar tipos inválidos no array', () => {
            const invalidData = {
                tags: ['tag1', 123, 'tag3'], // número não é válido
                categories: ['cat1'],
                optionalItems: null
            };
            
            expect(() => ArrayWithMultipleTypesDTO.fromJson(invalidData, false)).toThrow();
        });
    });
    
    
    describe('BaseDTO.fromJson - Falsy Values', () => {
        it('deve preservar valores falsy válidos (false, 0, "")', () => {
            class TestDTO extends BaseDTO {
                constructor() {
                    super();
                    this.flag = null;
                    this.count = null;
                    this.text = null;
                }

                static schema = {
                    flag: ['boolean'],
                    count: ['number'],
                    text: ['string']
                };
            }

            const data = {
                flag: false,
                count: 0,
                text: ""
            };

            const result = TestDTO.fromJson(data, false);
            expect(result.flag).toBe(false);
            expect(result.count).toBe(0);
            expect(result.text).toBe("");
        });
    });

    describe('BaseDTO.fromJson - Conversão de datas', () => {
        it('deve converter strings para Date objects', () => {
            const data = {
                id: 1,
                name: 'Test',
                email: 'test@example.com',
                isActive: true,
                birthDate: '1990-01-01T10:00:00Z',
                metadata: {}
            };

            const result = PersonDTO.fromJson(data, false);
            expect(result.birthDate).toBeInstanceOf(Date);
            expect(result.birthDate.getFullYear()).toBe(1990);
        });
    });

    describe('BaseDTO.fromJson - DTOs aninhados', () => {
        it('deve converter DTOs aninhados com acceptNulls propagado', () => {
            const companyData = {
                id: 1,
                name: 'Tech Corp',
                owner: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@techcorp.com',
                    isActive: true,
                    birthDate: '1980-01-01',
                    metadata: null
                },
                employees: [
                    {
                        id: 2,
                        name: 'Jane Smith',
                        email: 'jane@techcorp.com',
                        isActive: true,
                        birthDate: '1985-06-15',
                        metadata: null
                    }
                ]
            };

            const result = CompanyDTO.fromJson(companyData, true);
            
            expect(result).toBeInstanceOf(CompanyDTO);
            expect(result.owner).toBeInstanceOf(PersonDTO);
            expect(result.employees[0]).toBeInstanceOf(PersonDTO);
            expect(result.owner.birthDate).toBeInstanceOf(Date);
            expect(result.employees[0].birthDate).toBeInstanceOf(Date);
        });

        it('deve falhar com acceptNulls=false quando há nulls', () => {
            const companyDataWithNulls = {
                id: 1,
                name: 'Tech Corp',
                owner: {
                    id: null, // Isso deve falhar com acceptNulls=false
                    name: 'John Doe',
                    email: 'john@techcorp.com',
                    isActive: true,
                    birthDate: '1980-01-01',
                    metadata: null
                },
                employees: []
            };

            expect(() => {
                CompanyDTO.fromJson(companyDataWithNulls, false);
            }).toThrow('JSON inválido');
        });
    });

    describe('BaseDTO.fromJson - Aninhamento profundo', () => {
        it('deve processar DTOs com múltiplos níveis de aninhamento', () => {
            const nestedData = {
                level1: {
                    value: 'Level 1 Value',
                    level2: {
                        deepValue: 42,
                        flag: true
                    }
                }
            };

            const result = NestedTestDTO.fromJson(nestedData, false);
            
            expect(result).toBeInstanceOf(NestedTestDTO);
            expect(result.level1).toBeInstanceOf(Level1DTO);
            expect(result.level1.level2).toBeInstanceOf(Level2DTO);
            expect(result.level1.value).toBe('Level 1 Value');
            expect(result.level1.level2.deepValue).toBe(42);
            expect(result.level1.level2.flag).toBe(true);
        });

        it('deve propagar acceptNulls através de múltiplos níveis', () => {
            const nestedDataWithNulls = {
                level1: {
                    value: 'Level 1 Value',
                    level2: {
                        deepValue: null,
                        flag: null
                    }
                }
            };

            // Com acceptNulls=true deve funcionar
            expect(() => {
                const result = NestedTestDTO.fromJson(nestedDataWithNulls, true);
                expect(result.level1.level2.deepValue).toBe(null);
                expect(result.level1.level2.flag).toBe(null);
            }).not.toThrow();

            // Com acceptNulls=false deve falhar
            expect(() => {
                NestedTestDTO.fromJson(nestedDataWithNulls, false);
            }).toThrow('JSON inválido');
        });
    });

    describe('BaseDTO.fromJson - Mensagens de erro', () => {
        it('deve fornecer informações detalhadas sobre falhas de validação', () => {
            const invalidData = {
                id: 'not-a-number',
                name: 123,
                email: true,
                isActive: 'not-boolean',
                birthDate: [],
                metadata: 'not-object'
            };

            // Capturar logs de erro
            const originalError = console.error;
            const errorLogs = [];
            console.error = (...args) => errorLogs.push(args);

            try {
                PersonDTO.fromJson(invalidData, false);
            } catch (error) {
                // Restaurar console.error
                console.error = originalError;
                
                expect(error.message).toContain('JSON inválido para PersonDTO');
                expect(errorLogs.length).toBeGreaterThan(0);
                
                // Verificar se as mensagens de erro contêm informações úteis
                const errorMessages = errorLogs.flat().join(' ');
                expect(errorMessages).toContain('Validação falhou para chave');
            }
        });
    });

    describe('BaseDTO.fromJson - Edge Cases', () => {
        it('deve lidar com objetos vazios (quando acceptNulls=true permite campos ausentes)', () => {
            class OptionalDTO extends BaseDTO {
                constructor() {
                    super();
                    this.optionalField = null;
                }

                static schema = {
                    optionalField: ['string', 'null']
                };
            }

            // Com acceptNulls=true e schema que aceita null, deve funcionar
            expect(() => {
                const result = OptionalDTO.fromJson({}, true);
                expect(result.optionalField).toBe(null); // Valor do constructor é mantido quando campo ausente
            }).not.toThrow();
        });

        it('deve lidar com arrays vazios em campos array', () => {
            const companyData = {
                id: 1,
                name: 'Empty Corp',
                owner: {
                    id: 1,
                    name: 'Owner',
                    email: 'owner@empty.com',
                    isActive: true,
                    birthDate: '1980-01-01',
                    metadata: {}
                },
                employees: []
            };

            const result = CompanyDTO.fromJson(companyData, false);
            expect(result.employees).toEqual([]);
        });

        it('deve validar schemas com tipos únicos (não arrays)', () => {
            class SimpleDTO extends BaseDTO {
                constructor() {
                    super();
                    this.value = null;
                }

                static schema = {
                    value: 'string' // Tipo único, não array
                };
            }

            const result = SimpleDTO.fromJson({ value: 'test' }, false);
            expect(result.value).toBe('test');
        });
    });

    describe('BaseDTO.isValid', () => {
        it('deve validar DTO com dados válidos', () => {
            const validPerson = new PersonDTO();
            validPerson.id = 1;
            validPerson.name = 'John Doe';
            validPerson.email = 'john@example.com';
            validPerson.isActive = true;
            validPerson.birthDate = new Date('1990-01-01');
            validPerson.metadata = {};

            expect(validPerson.isValid(false)).toBe(true);
        });

        it('deve invalidar DTO com dados inválidos', () => {
            const invalidPerson = new PersonDTO();
            invalidPerson.id = 'not-a-number'; // Tipo incorreto
            invalidPerson.name = 'John Doe';
            invalidPerson.email = 'john@example.com';
            invalidPerson.isActive = true;
            invalidPerson.birthDate = new Date('1990-01-01');
            invalidPerson.metadata = {};

            expect(invalidPerson.isValid(false)).toBe(false);
        });
    });
});