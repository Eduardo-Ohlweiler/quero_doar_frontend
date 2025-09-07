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
}

export const buildLink = StringUtil.buildLink;