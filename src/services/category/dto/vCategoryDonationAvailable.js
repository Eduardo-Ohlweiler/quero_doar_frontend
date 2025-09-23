import BaseDTO from "../../util/baseDTO";

export default class VCategoryDonationAvailable extends BaseDTO {
    constructor() {
        super();
        this.categoryId = null;
        this.name = null;
        this.donationAvailable = null;
    }

    static schema = {
        categoryId: ['number'],
        name: ['string'],
        donationAvailable: ['number']
    };
}