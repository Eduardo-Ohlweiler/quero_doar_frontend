/**
 * Utilitários para manipulação de strings.
 * @module services/util/stringUtil
 */
export default class StringUtil  {

    /**
     * Monta uma URL a partir de segmentos, parâmetros de query e anchor.
     * @param {string[]} segments - Array de segmentos (pelo menos 1)
     * @param {Record<string,string>|undefined} queryParams - Parâmetros de query
     * @param {string|undefined} anchor - Fragmento (anchor)
     * @returns {string}
     * @throws {Error} Se segments for vazio
     * @example
     * StringUtil.buildLink(['api', '/users/','123/'], { q: 'a b', page: '1' }, 'section');
     * retorna "api/users/123?q=a%20b&page=1#section"
     */
    static buildLink(segments, queryParams, anchor) {
        if (!segments || segments.length === 0) {
            throw new Error("At least one segment must be provided.");
        }

        const basePath = segments
            .map(s => String(s).replace(/^\/+|\/+$/g, ""))
            .join("/");

        let queryString = "";
        if (queryParams && Object.keys(queryParams).length > 0) {
            queryString =
                "?" +
                Object.entries(queryParams)
                    .filter(([key]) => key !== null && key !== undefined)
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value ?? "")}`)
                    .join("&");
        }

        let fragment = "";
        if (anchor && String(anchor).trim() !== "") {
            fragment = "#" + String(anchor).replace(/^#+/, "");
        }

        const finalUrl = basePath + queryString + fragment;
        return finalUrl;
    }

    /**
     * Resolve o caminho de uma imagem de doação, retornando parte do caminho resolvido com base no Id
     * @param {number} donationId - ID da doação
     * @param {number} separatorLength - Quantidade de dígitos por segmento (padrão 2)
     * @returns {string} Caminho resolvido (ex: "0/1/2")
     * @throws {Error} Se donationId não for um número não negativo
     * @thriws {Error} Se separatorLength não for um número positivo 
     * @example
     * StringUtil.resolveSegmentsPathById(15486);
     * retorna "00/00/01/54/86"
     */
    static resolveSegmentsPathById(donationId, separatorLength = 2) {
        if (typeof donationId !== 'number' || Number.isNaN(donationId) || donationId < 0) {
            throw new Error("donationId must be a non-negative number.");
        }

        if (typeof separatorLength !== 'number' || Number.isNaN(separatorLength) || separatorLength <= 0) {
            throw new Error("separatorLength must be a positive number.");
        }
        
        const idStr = String(donationId).padStart(10, '0');

        const segments = [];
        for (let i = 0; i < idStr.length; i += separatorLength) {
            segments.push(idStr.substring(i, i + separatorLength));
        }

        return segments.join('/');
    }
}

export const buildLink = StringUtil.buildLink;
export const resolveDonationImagePath = StringUtil.resolveDonationImagePath;