import { objectTypesMatch } from '../../util/Validation';

export default class VUserDonationAchievementDTO {
    constructor(
        userId,
        donationAchievementId,
        date,
        amount,
        donationType,
        donationTypeIndicator,
        description
    ) {
        this.userId = userId ?? null;
        this.donationAchievementId = donationAchievementId ?? null;
        this.date = date ?? null; // Date instance or null
        this.amount = amount ?? null;
        this.donationType = donationType ?? null; // single char expected but stored as string
        this.donationTypeIndicator = donationTypeIndicator ?? null;
        this.description = description ?? null;
    }

    // schema: attribute -> accepted types
    static schema = {
        userId: ['number', 'null'],
        donationAchievementId: ['number', 'null'],
        // accept ISO string or Date object or null
        date: ['string', 'date', 'null'],
        amount: ['number', 'null'],
        // donationType is a character in Java; represent as string here (allow null)
        donationType: ['string', 'null'],
        donationTypeIndicator: ['string', 'null'],
        description: ['string', 'null'],
    }

    // fromJson accepts a JSON string or an object, validates using objectTypesMatch and returns a VUserDonationAchievementDTO
    static fromJson(json) {
        const obj = (typeof json === 'string') ? JSON.parse(json) : json;

        if (!objectTypesMatch(VUserDonationAchievementDTO.schema, obj)) {
            throw new Error('JSON inválido para VUserDonationAchievementDTO');
        }

        // convert date string to Date instance if necessary
        let dateVal = null;
        if (obj.date !== undefined && obj.date !== null) {
            dateVal = (typeof obj.date === 'string') ? new Date(obj.date) : obj.date;
        }

        // ensure donationType is a single character string (if provided)
        let donationTypeVal = null;
        if (obj.donationType !== undefined && obj.donationType !== null) {
            donationTypeVal = String(obj.donationType);
            if (donationTypeVal.length > 1) donationTypeVal = donationTypeVal.charAt(0);
        }

        return new VUserDonationAchievementDTO(
            obj.userId,
            obj.donationAchievementId,
            dateVal,
            obj.amount,
            donationTypeVal,
            obj.donationTypeIndicator,
            obj.description
        );
    }

    // static validator that checks a plain object matches the schema
    static isValid(obj) {
        return objectTypesMatch(VUserDonationAchievementDTO.schema, obj);
    }

    // instance validator
    isValid() {
        return VUserDonationAchievementDTO.isValid(this);
    }
}