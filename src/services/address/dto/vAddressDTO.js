import { objectTypesMatch } from '../../util/Validation';

export default class VAddressDTO {
    constructor(
        addressId,
        cityId,
        stateId,
        postalCode,
        street,
        number,
        neighborhood,
        complement,
        reference,
        city,
        cityIbgeCode,
        state,
        stateAcronym,
        stateIbgeCode
    ) {
        this.addressId = addressId ?? null;
        this.cityId = cityId ?? null;
        this.stateId = stateId ?? null;
        this.postalCode = postalCode ?? null;
        this.street = street ?? null;
        this.number = number ?? null;
        this.neighborhood = neighborhood ?? null;
        this.complement = complement ?? null;
        this.reference = reference ?? null;
        this.city = city ?? null;
        this.cityIbgeCode = cityIbgeCode ?? null;
        this.state = state ?? null;
        this.stateAcronym = stateAcronym ?? null;
        this.stateIbgeCode = stateIbgeCode ?? null;
    }

    static schema = {
        addressId: ['number', 'null'],
        cityId: ['number', 'null'],
        stateId: ['number', 'null'],
        postalCode: ['string', 'null'],
        street: ['string', 'null'],
        number: ['string', 'null'],
        neighborhood: ['string', 'null'],
        complement: ['string', 'null'],
        reference: ['string', 'null'],
        city: ['string', 'null'],
        cityIbgeCode: ['string', 'null'],
        state: ['string', 'null'],
        stateAcronym: ['string', 'null'],
        stateIbgeCode: ['string', 'null'],
    }

    static fromJson(json) {
        const obj = (typeof json === 'string') ? JSON.parse(json) : json;

        if (!objectTypesMatch(VAddressDTO.schema, obj)) {
            throw new Error('JSON inválido para VAddressDTO');
        }

        return new VAddressDTO(
            obj.addressId,
            obj.cityId,
            obj.stateId,
            obj.postalCode,
            obj.street,
            obj.number,
            obj.neighborhood,
            obj.complement,
            obj.reference,
            obj.city,
            obj.cityIbgeCode,
            obj.state,
            obj.stateAcronym,
            obj.stateIbgeCode
        );
    }

    static isValid(obj) {
        return objectTypesMatch(VAddressDTO.schema, obj);
    }

    isValid() {
        return VAddressDTO.isValid(this);
    }
}