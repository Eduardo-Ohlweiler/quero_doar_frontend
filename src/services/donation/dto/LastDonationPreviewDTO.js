import BaseDTO from "../../util/baseDTO";
import PreviewDonationDTO from "./PreviewDonationDTO";

export default class LastDonationPreviewDTO extends BaseDTO {
    constructor() {
        super();
        this.cityName = null;
        this.listDonationPreviewDto = null;
    }

    static schema = {
        cityName: ['string'],
        listDonationPreviewDto: ['array', PreviewDonationDTO]
    };
}