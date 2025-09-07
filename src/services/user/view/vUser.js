import { objectTypesMatch } from '../../util/Validation.js';
import VUserStatisticDTO from '../dto/VUserStatisticDTO.js'
import VAddressDTO from '../../../address/dto/vAddressDTO.js';
import VUserDonationAchievementDTO from '../../dto/VUserDonationAchievementDTO.js';
import VUserFeedbackAchievementDTO from '../../dto/VUserFeedbackAchievementDTO.js';

export default class VUser {
    constructor(
        userId,
        name,
        email,
        cellPhone,
        homePhone,
        whatsapp,
        isActive,
        verified,
        role,
        photo,
        vUserStatistic,
        vAddress,
        vUserDonationAchievement,
        vUserFeedbackAchievement
    ) {
        this.userId = userId ?? null;
        this.name = name ?? null;
        this.email = email ?? null;
        this.cellPhone = cellPhone ?? null;
        this.homePhone = homePhone ?? null;
        this.whatsapp = whatsapp ?? null;
        this.isActive = isActive ?? null;
        this.verified = verified ?? null;
        this.role = role ?? null;
        this.photo = photo ?? null;
        this.vUserStatistic = vUserStatistic !== null ? VUserStatisticDTO.fromJson(vUserStatistic) : vUserStatistic;
        this.vAddress = vAddress !== null ? VAddressDTO.fromJson(vAddress) : vAddress;
        this.vUserDonationAchievement = vUserDonationAchievement !== null ? VUserDonationAchievementDTO.fromJson(vUserDonationAchievement) : vUserDonationAchievement;
        this.vUserFeedbackAchievement = vUserFeedbackAchievement !== null ? VUserFeedbackAchievementDTO.fromJson(vUserFeedbackAchievement) : vUserFeedbackAchievement;
    }

    static schema = {
        userId: ['number', 'null'],
        name: ['string', 'null'],
        email: ['string', 'null'],
        cellPhone: ['string', 'null'],
        homePhone: ['string', 'null'],
        whatsapp: ['string', 'null'],
        isActive: ['boolean', 'null'],
        verified: ['boolean', 'null'],
        role: ['string', 'null'],
        photo: ['string', 'null'],
        vUserStatistic: ['object', 'null'],
        vAddress: ['object', 'null'],
        vUserDonationAchievement: ['object', 'null'],
        vUserFeedbackAchievement: ['object', 'null'],
    };

    static fromJson(json) {
        const obj = (typeof json === 'string') ? JSON.parse(json) : json;

        if (!objectTypesMatch(VUser.schema, obj)) {
            throw new Error('JSON inválido para VUser (campos primitivos)');
        }

        let vUser = new VUser({
            userId: obj.userId,
            name: obj.name,
            email: obj.email,
            cellPhone: obj.cellPhone,
            homePhone: obj.homePhone,
            whatsapp: obj.whatsapp,
            isActive: obj.isActive,
            verified: obj.verified,
            role: obj.role,
            photo: obj.photo,
            vUserStatistic: obj.vUserStatistic,
            vAddress: obj.vAddress,
            vUserDonationAchievement: obj.vUserDonationAchievement,
            vUserFeedbackAchievement: obj.vUserFeedbackAchievement,
        });

        if(!vUser.vUserStatistic.isValid()) {
            throw new Error('JSON inválido para VUserStatisticDTO');
        }

        if(!vUser.vAddress.isValid()) {
            throw new Error('JSON inválido para VAddressDTO');
        }

        if(!vUser.vUserDonationAchievement.isValid()) {
            throw new Error('JSON inválido para VUserDonationAchievementDTO');
        }

        if(!vUser.vUserFeedbackAchievement.isValid()) {
            throw new Error('JSON inválido para VUserFeedbackAchievementDTO');
        }

        return vUser;
    }

    static isValid(obj) {
        return objectTypesMatch(VUser.schema, obj);
    }

    isValid() {
        return VUser.isValid(this);
    }
}
