import BaseDTO from "../../util/baseDTO";

export default class CityMinimalDTO extends BaseDTO {
    constructor() {
        super();
        this.cityId = null;
        this.name = null;
    }
    
    static schema = {
        cityId: ["number"],
        name: ["string"]
    };
}