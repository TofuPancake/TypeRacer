import { GAME_LENGTH_SECONDS } from '../../gameConfig';

/**
 * @returns Words per minute, num of words / minutes passed
 */
export function calculateWPM(text, gameTimeLeftInSeconds) {
    const secondsElapsed = GAME_LENGTH_SECONDS - gameTimeLeftInSeconds;
    const numOfCharacters = text.length;
    const charactersPerSecond = numOfCharacters / secondsElapsed;

    // Assuming each word is 5 characters; well-known method for averaging out.
    // https://github.com/cslarsen/wpm#:~:text=The%20WPM%20is%20calculated%20by,to%20gauge%20your%20typing%20speed.
    const wordsTypedPerSecond  = charactersPerSecond / 5;

    const wpm = Math.round(wordsTypedPerSecond * 60);
    return Number.isFinite(wpm) ? wpm : 0;
}

/**
 * @param {int} gameTimeLeftInSeconds in seconds
 * @returns Nicely formatted string of a time, {minutes:seconds}
 */
export function generateTimerString(gameTimeLeftInSeconds) {
    const minutesLeft = Math.floor(gameTimeLeftInSeconds / 60);
    const secondsLeft = gameTimeLeftInSeconds - minutesLeft*60;

    return addLeadingZeros(minutesLeft) + ':' + addLeadingZeros(secondsLeft);
}

function addLeadingZeros(n) {
    return (n < 10 ? '0' : '') + n;
}