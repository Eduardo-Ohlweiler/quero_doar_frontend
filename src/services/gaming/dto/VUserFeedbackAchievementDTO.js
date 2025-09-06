import { objectTypesMatch } from '../../util/Validation.js';

export default class VUserFeedbackAchievementDTO {
    constructor(
        userId,
        feedbackAchievementId,
        date,
        amount,
        description
    ) {
        this.userId = userId ?? null;
        this.feedbackAchievementId = feedbackAchievementId ?? null;
        this.date = date ?? null; // Date instance or null
        this.amount = amount ?? null;
        this.description = description ?? null;
    }

    static schema = {
        userId: ['number', 'null'],
        feedbackAchievementId: ['number', 'null'],
        date: ['string', 'date', 'null'],
        amount: ['number', 'null'],
        description: ['string', 'null'],
    }

    static fromJson(json) {
        const obj = (typeof json === 'string') ? JSON.parse(json) : json;

        if (!objectTypesMatch(VUserFeedbackAchievementDTO.schema, obj)) {
            throw new Error('JSON inválido para VUserFeedbackAchievementDTO');
        }

        let dateVal = null;
        if (obj.date !== undefined && obj.date !== null) {
            dateVal = (typeof obj.date === 'string') ? new Date(obj.date) : obj.date;
        }

        return new VUserFeedbackAchievementDTO(
            obj.userId,
            obj.feedbackAchievementId,
            dateVal,
            obj.amount,
            obj.description
        );
    }

    static isValid(obj) {
        return objectTypesMatch(VUserFeedbackAchievementDTO.schema, obj);
    }

    isValid() {
        return VUserFeedbackAchievementDTO.isValid(this);
    }
}
