import { getPlayerName } from '../playerUtils';

describe('getPlayerName tests', () => {
    test('Null lobby edge case', () => {
        expect(getPlayerName('123', null)).toBeNull();
    });

    test('Player not found edge case', () => {
        const mockLobby = {
            players: [{socketId: 'ABC', name: 'trees'}, {socketId: '123', name: 'bees'}]
        };

        expect(getPlayerName('ice-cream', mockLobby)).toBeNull();
    });

    test('Finds player successfully', () => {
        const mockLobby = {
            players: [
                {socketId: 'ABC', name: 'trees'},
                {socketId: '123', name: 'bees'},
                {socketId: 'ice-cream', name: 'jen'}
            ]
        };

        expect(getPlayerName('ice-cream', mockLobby)).toEqual('jen');
    });

    test('Finds player successfully, null name', () => {
        const mockLobby = {
            players: [
                {socketId: 'ABC', name: 'trees'},
                {socketId: '123', name: 'bees'},
                {socketId: 'ice-cream', name: null}
            ]
        };

        expect(getPlayerName('ice-cream', mockLobby)).toBeNull();
    });
});
