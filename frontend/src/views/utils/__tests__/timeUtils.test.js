import { calculateWPM, generateTimerString } from '../timeUtils'

describe('calculateWPM tests', () => {
    const gameLength = 300;

    test('WPM calculation', () => {
        const gameTimeLeftInSeconds = gameLength - 60;
        const wpm = calculateWPM('hi my name is tianren', gameTimeLeftInSeconds);
        expect(wpm).toBe(4);
    })

    test('End of game WPM calculation', () => {
        const gameTimeLeftInSeconds = 300 - gameLength;
        const wpm = calculateWPM('hi my name is tianren', gameTimeLeftInSeconds);
        expect(wpm).toBe(1);
    })

    test('Start of game WPM calculation', () => {
        const gameTimeLeftInSeconds = gameLength;
        const wpm = calculateWPM('hi my name is tianren', gameTimeLeftInSeconds);
        expect(wpm).toBe(0);
    })
})

describe('generateTimerString tests', () => {
    const gameLength = 300;

    test('Start of the game', () => {
        const gameTimeLeftInSeconds = gameLength;
        const timerString = generateTimerString(gameTimeLeftInSeconds);
        expect(timerString).toEqual('05:00')
    })

    test('End of the game', () => {
        const timerString = generateTimerString(0);
        expect(timerString).toEqual('00:00')
    })

    test('Rounding number calculation', () => {
        const gameTimeLeftInSeconds = gameLength - 70;
        const timerString = generateTimerString(gameTimeLeftInSeconds);
        expect(timerString).toEqual('03:50')
    })
})