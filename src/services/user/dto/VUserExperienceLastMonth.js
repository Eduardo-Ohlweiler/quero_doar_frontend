import BaseDTO from "../../util/baseDTO";

export default class VUserExperienceLastMonth extends BaseDTO {
    constructor() {
        super();
        this.userId = null;
        this.name = null;
        this.photo = null;
        this.location = null;
        this.donationMonth = null;
        this.expMonth = null;
        this.level = null;
    }

    static schema = {
        userId: ['number'],
        name: ['string'],
        photo: ['string', 'null'],
        location: ['string', 'null'],
        donationMonth: ['number'],
        expMonth: ['number'],
        level: ['number']
    };
}