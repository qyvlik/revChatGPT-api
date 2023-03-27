import * as util from 'util';

/**
 * 睡眠 ms 毫秒
 * @param ms                {number}
 * @return {Promise<void>}
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function paramIsInvalidate(paramsName) {
    return {code: 401, message: `${paramsName} is invalidate`, data: null};
}

/**
 * 字符串是否为空白
 * @param str       {string|undefined|null}
 * @return {boolean}
 */
export function stringIsBlank(str) {
    return typeof str === 'undefined' || str === null || (typeof str === 'string' && str.trim() === '');
}

export function detach(fun, thisObject, ...args) {
    if (!util.types.isAsyncFunction(fun)) {
        throw new Error(`fun must be a async function`);
    }
    fun.call(thisObject, ...args);
}
