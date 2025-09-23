import BaseDTO from "../../util/baseDTO";

export default class UserMinimalWithLevelDTO extends BaseDTO {
    constructor() {
        super();
        this.userId = null;
        this.name = null;
        this.photo = null;
        this.level = null;
    }

    static schema = {
        userId: ['number'],
        name: ['string'],
        photo: ['string', 'null'],
        level: ['number', 'null']
    };
}
