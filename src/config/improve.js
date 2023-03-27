import * as dotenv from 'dotenv';
import moment from 'moment-timezone';

dotenv.config();

const LOG_LEVELS = [`debug`, `info`, `error`];
const TZ = process.env[`TZ`] || `Asia/Shanghai`;
const LOG_LEVEL = process.env['LOG_LEVEL'] || 'info';

function tzt(time = null) {
    if (typeof time === "undefined" || time === null) {
        return moment().tz(TZ).format(`yyyy-MM-DDTHH:mm:ss.SSSZ`);
    }
    if (typeof time !== 'number') {
        throw new Error(`time must be number!`);
    }
    return moment.tz(time, TZ).format(`yyyy-MM-DDTHH:mm:ss.SSSZ`);
}

function improveConsole() {
    // 0, 1, 2
    const level = LOG_LEVELS.indexOf(LOG_LEVEL);
    const info = console.info;
    const debug = console.debug;
    const error = console.error;
    const empty = () => {};

    console.error = (...args) => error.call(console, 'error', `|`, tzt(), '|', ...args);
    console.info = level < 2 ? (...args) => info.call(console, 'info', `|`, tzt(), '|', ...args) : empty;
    console.debug = level === 0 ? (...args) => debug.call(console, 'debug', `|`, tzt(), '|', ...args) : empty;
}

improveConsole()