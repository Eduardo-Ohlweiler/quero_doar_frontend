import BaseDTO from "../../util/baseDTO";

export default class UserMinimalDTO extends BaseDTO {
    constructor() {
        super();
        this.userId = null;
        this.name = null;
        this.photo = null;
    }

    static schema = {
        userId: ['number'],
        name: ['string'],
        photo: ['string', 'null']
    };
}