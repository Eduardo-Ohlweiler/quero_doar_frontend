import BaseDTO from "../../util/baseDTO";

export default class SubcategoryDTO extends BaseDTO {
    constructor() {
        super();
        this.subcategoryId = null;
        this.name = null;
    }

    static schema = {
        subcategoryId: ['number'],
        name: ['string']
    };
}