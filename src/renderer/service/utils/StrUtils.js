'use strict'; // must be in strict mode

class StrUtils {
    constructor() {
    }

    replaceAll(str, org, dest) {
        return str.split(org).join(dest);
    }

    /**
     * 문자열이 비어 있는지 검사
     *
     * @param str
     * @returns {boolean}
     */
    isEmpty(str) {
        return (!str || 0 === str.length);
    }

    /**
     * 문자열이 공백이거나 null인지 또는 정의되지 않았는지 확인
     *
     * @param str
     * @returns {boolean}
     */

    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
}

export default new StrUtils();
