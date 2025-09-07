import { objectTypesMatch } from '../../util/Validation.js';

export default class VUserStatisticDTO {
    constructor(
        userId,
        feedbackCount,
        feedbackWithCommentCount,
        totalDonationCount,
        sendDonationCount,
        receiveDonationCount,
        currentLevel,
        currentExp,
        nextLevel,
        expPointsToNextLevel
    ) {
        this.userId = userId ?? null;
        this.feedbackCount = feedbackCount ?? null;
        this.feedbackWithCommentCount = feedbackWithCommentCount ?? null;
        this.totalDonationCount = totalDonationCount ?? null;
        this.sendDonationCount = sendDonationCount ?? null;
        this.receiveDonationCount = receiveDonationCount ?? null;
        this.currentLevel = currentLevel ?? null; // number or null
        this.currentExp = currentExp ?? null;
        this.nextLevel = nextLevel ?? null; // number or null
        this.expPointsToNextLevel = expPointsToNextLevel ?? null;
    }

    // schema: attribute -> accepted types
    static schema = {
        userId: ['number', 'null'],
        feedbackCount: ['number', 'null'],
        feedbackWithCommentCount: ['number', 'null'],
        totalDonationCount: ['number', 'null'],
        sendDonationCount: ['number', 'null'],
        receiveDonationCount: ['number', 'null'],
        // BigDecimal fields: accept number, string (decimal) or null
        currentLevel: ['number', 'string', 'null'],
        currentExp: ['number', 'null'],
        nextLevel: ['number', 'string', 'null'],
        expPointsToNextLevel: ['number', 'null'],
    }

    // fromJson accepts string or object, validates and returns an instance
    static fromJson(json) {
        const obj = (typeof json === 'string') ? JSON.parse(json) : json;

        if (!objectTypesMatch(VUserStatisticDTO.schema, obj)) {
            throw new Error('JSON inválido para VUserStatisticDTO');
        }

        // normalize BigDecimal-like fields to Number when string
        const currentLevelVal = (obj.currentLevel === null || obj.currentLevel === undefined)
            ? null
            : (typeof obj.currentLevel === 'string' ? Number(obj.currentLevel) : obj.currentLevel);

        const nextLevelVal = (obj.nextLevel === null || obj.nextLevel === undefined)
            ? null
            : (typeof obj.nextLevel === 'string' ? Number(obj.nextLevel) : obj.nextLevel);

        return new VUserStatisticDTO(
            obj.userId,
            obj.feedbackCount,
            obj.feedbackWithCommentCount,
            obj.totalDonationCount,
            obj.sendDonationCount,
            obj.receiveDonationCount,
            currentLevelVal,
            obj.currentExp,
            nextLevelVal,
            obj.expPointsToNextLevel
        );
    }

    static isValid(obj) {
        return objectTypesMatch(VUserStatisticDTO.schema, obj);
    }

    isValid() {
        return VUserStatisticDTO.isValid(this);
    }
}
