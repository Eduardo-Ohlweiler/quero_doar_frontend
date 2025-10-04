import BaseDTO from "../../util/baseDTO";

export default class PagedResult extends BaseDTO {
    constructor() {
        super();
        this.elements = null;
        this.totalElements = null;
        this.currentPage = null;
        this.pageSize = null;
    }

    static schema = {
        elements: ['array', 'object', 'null'],
        totalElements: ['number'],
        currentPage: ['number'],
        pageSize: ['number']
    };
}