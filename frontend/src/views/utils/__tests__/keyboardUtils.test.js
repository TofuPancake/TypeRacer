import { applyKeyPressed, hasPlayerFinished, currentWord, recalculateCorrectCharacters} from '../keyboardUtils';

describe('applyKeyPressed tests', () => {
    test('Add character onto existing text correctly', () => {
        const mockText = 'icecream';
        const mockKeyPressed = '!';

        const result = applyKeyPressed(mockText, mockKeyPressed);
        expect(result).toEqual('icecream!');
    });

    test('Backspace correctly', () => {
        const mockText = 'icecream!';
        const mockKeyPressed = 'Backspace';

        const result = applyKeyPressed(mockText, mockKeyPressed);
        expect(result).toEqual('icecream');
    });

    test('Backspace with no existing text correctly', () => {
        const mockText = '';
        const mockKeyPressed = 'Backspace';

        const result = applyKeyPressed(mockText, mockKeyPressed);
        expect(result).toEqual('');
    });
});

describe('hasPlayerFinished tests', () => {
    test('Text typed is larger than original text, NONE are equal', () => {
        const mockText = 'I have icecream';
        const mockKeyPressed = 'Backspace';
        const playerTextTyped = 'I have iceads2E!WE#!';

        const result = hasPlayerFinished(mockText, playerTextTyped, mockKeyPressed);
        expect(result).toBe(false);
    });

    test('Text typed exactly equal to original text', () => {
        const mockText = 'I have icecream!';
        const mockKeyPressed = '!';
        const playerTextTyped = 'I have icecream';

        const result = hasPlayerFinished(mockText, playerTextTyped, mockKeyPressed);
        expect(result).toBe(true);
    });

    test('Empty original text, correctly typed text', () => {
        const mockText = '';
        const mockKeyPressed = 'Backspace';
        const playerTextTyped = '!';

        const result = hasPlayerFinished(mockText, playerTextTyped, mockKeyPressed);
        expect(result).toBe(true);
    });

    test('Empty text typed, not correctly typed text', () => {
        const mockText = 'I have icecream';
        const mockKeyPressed = 'Backspace';
        const playerTextTyped = '';

        const result = hasPlayerFinished(mockText, playerTextTyped, mockKeyPressed);
        expect(result).toBe(false);
    });
});

describe('currentWord tests', () => {
    test('Get correct word correctly', () => {
        const mockText = 'I have icecream';
        const playerTextTyped = 'I ha';

        const result = currentWord(mockText, playerTextTyped);
        expect(result).toEqual('have');
    });

    test('Get correct word correctly, no characters typed for word', () => {
        const mockText = 'I have icecream';
        const playerTextTyped = 'I '; // Space is required, otherwise the player is not truly on the next word

        const result = currentWord(mockText, playerTextTyped);
        expect(result).toEqual('have');
    });

    test('Get correct word correctly, typed more than original text', () => {
        const mockText = 'I have icecream';
        const playerTextTyped = 'I ha a a sd';

        const result = currentWord(mockText, playerTextTyped);
        expect(result).toBeNull();
    });
});

describe('recalculateCorrectCharacters tests', () => {
    test('All text is wrong', () => {
        const mockText = 'I have icecream';
        const playerTextTyped = '###';

        const result = recalculateCorrectCharacters(mockText, playerTextTyped);
        expect(result).toEqual([false, false, false]);
    });

    test('All text is correct', () => {
        const mockText = 'I have icecream';
        const playerTextTyped = 'I ha';

        const result = recalculateCorrectCharacters(mockText, playerTextTyped);
        expect(result).toEqual([true, true, true, true]);
    });

    test('Some text is wrong and correct', () => {
        const mockText = 'I have icecream';
        const playerTextTyped = 'I ha#e';

        const result = recalculateCorrectCharacters(mockText, playerTextTyped);
        expect(result).toEqual([true, true, true, true, false, true]);
    });
});
