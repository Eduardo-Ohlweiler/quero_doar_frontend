import { objectTypesMatch } from '../../util/Validation';
import VUserStatisticDTO from '../dto/VUserStatisticDTO'
import VAddressDTO from '../../address/dto/vAddressDTO';
import VUserDonationAchievementDTO from '../../gaming/dto/VUserDonationAchievementDTO';
import VUserFeedbackAchievementDTO from '../../gaming/dto/VUserFeedbackAchievementDTO';

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
        vuserStatistic,
        vaddress,
        vuserDonationAchievement,
        vuserFeedbackAchievement
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
        this.vuserStatistic = vuserStatistic !== null ? VUserStatisticDTO.fromJson(vuserStatistic) : vuserStatistic;
        this.vaddress = vaddress !== null ? VAddressDTO.fromJson(vaddress) : vaddress;
        this.vuserDonationAchievement = vuserDonationAchievement !== null ? VUserDonationAchievementDTO.fromJson(vuserDonationAchievement) : vuserDonationAchievement;
        this.vuserFeedbackAchievement = vuserFeedbackAchievement !== null ? VUserFeedbackAchievementDTO.fromJson(vuserFeedbackAchievement) : vuserFeedbackAchievement;
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
        vuserStatistic: ['object', 'null'],
        vaddress: ['object', 'null'],
        vuserDonationAchievement: ['object', 'null'],
        vuserFeedbackAchievement: ['object', 'null'],
    };

    static fromJson(json) {
        const obj = (typeof json === 'string') ? JSON.parse(json) : json;

        if (!objectTypesMatch(VUser.schema, obj)) {
            throw new Error('JSON inválido para VUser (campos primitivos)');
        }

        let vUser = new VUser(
            obj.userId,
            obj.name,
            obj.email,
            obj.cellPhone,
            obj.homePhone,
            obj.whatsapp,
            obj.isActive,
            obj.verified,
            obj.role,
            obj.photo,
            obj.vuserStatistic,
            obj.vaddress,
            obj.vuserDonationAchievement,
            obj.vuserFeedbackAchievement,
        );

        if(!vUser.vuserStatistic.isValid()) {
            throw new Error('JSON inválido para vuserStatisticDTO');
        }

        if(!vUser.vaddress.isValid()) {
            throw new Error('JSON inválido para vaddressDTO');
        }

        if(!vUser.vuserDonationAchievement.isValid()) {
            throw new Error('JSON inválido para vuserDonationAchievementDTO');
        }

        if(!vUser.vuserFeedbackAchievement.isValid()) {
            throw new Error('JSON inválido para vuserFeedbackAchievementDTO');
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
