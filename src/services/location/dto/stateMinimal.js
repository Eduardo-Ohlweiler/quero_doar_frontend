import BaseDTO from "../../util/baseDTO";
import CityMinimalDTO from "./cityMinimal";

export default class StateMinimalDTO extends BaseDTO {
    constructor() {
        super();
        this.stateId = null;
        this.name = null;
        this.acronym = null;
        this.cities = null;
    }

    static schema = {
        stateId: ["number"],
        name: ["string"],
        acronym: ["string"],
        cities: ["array", CityMinimalDTO, "undefined", "null"]
    };
}
