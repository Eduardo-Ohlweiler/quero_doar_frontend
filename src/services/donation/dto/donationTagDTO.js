import BaseDTO from "../../util/baseDTO";

export default class DonationTagDTO extends BaseDTO {
    constructor() {
        super();
        this.donationTagId = null;
        this.name = null;
    }

    static schema = {
        donationTagId: ['number'],
        name: ['string']
    }
}