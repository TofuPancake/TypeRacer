import { handleSabotage, shouldBlindPlayer } from '../sabotageUtils';

describe('handleSabotage tests', () => {
    test('Sabotage confusion correctly', (done) => {
        const mock = jest.fn();
        mock.mockImplementation((text) => {
            expect(text).toEqual('Hi@@here! My name is Jennifer.');
            done(); 
        });

        const mockSabotage = {
            type: 'confusion',
        };

        const mockFullText = 'Hi there! My name is Jennifer.';
        const mockCorrectlyTypedCharacters = [true, true];

        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.1; // Special characters returned will be: @@@@@
        global.Math = mockMath;

        handleSabotage(mockSabotage, mockFullText, mockCorrectlyTypedCharacters, mock);
    });

    test('Sabotage confusion correctly near the end of the game', (done) => {
        const mock = jest.fn();
        mock.mockImplementation((text) => {
            expect(text).toEqual('Hi@');
            done(); 
        });

        const mockSabotage = {
            type: 'confusion',
        };

        const mockFullText = 'Hi!';
        const mockCorrectlyTypedCharacters = [true, true];

        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.1; // Special characters returned will be: @@@
        global.Math = mockMath;

        handleSabotage(mockSabotage, mockFullText, mockCorrectlyTypedCharacters, mock);
    });

    test('Sabotage mixup', (done) => {
        const mock = jest.fn();
        mock.mockImplementation((text) => {
            expect(text).toEqual('Hi 2 1');
            done(); 
        });

        const mockSabotage = {
            type: 'mixup',
        };

        const mockFullText = 'Hi 1 2';
        const mockCorrectlyTypedCharacters = [true, true, true];

        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.1; // Special characters returned will be: @@@
        global.Math = mockMath;

        handleSabotage(mockSabotage, mockFullText, mockCorrectlyTypedCharacters, mock);
    });
});

describe('shouldBlindPlayer tests', () => {
    test('Should blind player', () => {
        const mockSabotage = {
            type: 'blind',
        };

        const mockIndex = 5;
        const mockCorrectlyTypedCharacters = [true, true];

        const result = shouldBlindPlayer(mockSabotage, mockIndex, mockCorrectlyTypedCharacters);
        expect(result).toBe(true);
    });

    test('Should NOT be able to blind player', () => {
        const mockSabotage = {
            type: 'blind',
        };

        const mockIndex = 4;
        const mockCorrectlyTypedCharacters = [true, true];

        const result = shouldBlindPlayer(mockSabotage, mockIndex, mockCorrectlyTypedCharacters);
        expect(result).toBe(false);
    });
});
