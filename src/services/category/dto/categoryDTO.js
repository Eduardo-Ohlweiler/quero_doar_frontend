import SubcategoryDTO from "./subcategoryDto";
import BaseDTO from "../../util/baseDTO";

export default class CategoryDTO extends BaseDTO {
    constructor() {
        super();
        this.categoryId = null;
        this.name = null;
        this.subcategories = null; // Array of SubcategoryDTO
    }

    static schema = {
        categoryId: ['number'],
        name: ['string'],
        subcategories: ['array', SubcategoryDTO] // Array of SubcategoryDTO or null
    };
}
