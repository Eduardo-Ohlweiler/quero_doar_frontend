import BaseDTO from "../../util/baseDTO";
import UserMinimalDTO from "../../user/dto/userMinimalDTO";

export default class PreviewDonationDTO extends BaseDTO {
    constructor() {
        super();
        this.donationId = null;
        this.title = null;
        this.description = null;
        this.photo = null;
        this.isDonation = null;
        this.isPublic = null;
        this.location = null;
        this.date = null;
        this.userMinimal = null;
        this.status = null;
        this.distanceKm = null;
    }

    static schema = {
        donationId: ['number'],
        title: ['string'],
        description: ['string'],
        photo: ['string', 'null'],
        isDonation: ['boolean'],
        isPublic: ['boolean'],
        location: ['string'],
        date: ['date'],
        userMinimal: [UserMinimalDTO],
        status: ['string'],
        distanceKm: ['number']
    };
}