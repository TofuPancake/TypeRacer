import { sabotage } from '../sabotage';

jest.mock('../../LobbyRegister.js');
jest.mock('../../../sockets/emit/index.js');

test('sabotage test no sabotage 1/4 of the way', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.1;
  global.Math = mockMath;

  const mock = jest.fn(() => 'test');

  const game = {
    gameData: {
      get() {
        return {
          hasSabotaged: false,
          textTyped: '1',
          text: ['1', '2', '3', '4', '5', '6'],
        };
      },
      set() {},
      keys() { return ['test', 'test1']; },
    },
    lobbyId: mock,
  };

  // mock function should never be called because there should be no sabotages before 1/4.
  sabotage('test', game);
  expect(mock.mock.calls.length).toBe(0);
});

test('sabotage test 2/4 of the way', (done) => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.2;
  global.Math = mockMath;

  const game = {
    gameData: {
      get() {
        return {
          hasSabotaged: false,
          textTyped: '1 2 3',
          text: ['1', '2', '3', '4', '5', '6'],
        };
      },
      set() {},
      keys() { return ['test', 'test1']; },
    },
    lobbyId: done,
  };

  sabotage('test', game);
});

test('sabotage test sabotage 3/4 of the way', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.3;
  global.Math = mockMath;

  const mock = jest.fn(() => 'test');

  const game = {
    gameData: {
      get() {
        return {
          hasSabotaged: false,
          textTyped: '1 2 3',
          text: ['1', '2', '3', '4', '5', '6'],
        };
      },
      set() {},
      keys() { return ['test', 'test1']; },
    },
    lobbyId: mock,
  };

  // mock function should never be called because Math.random value is too high to trigger.
  sabotage('test', game);
  expect(mock.mock.calls.length).toBe(0);
});

test('sabotage test last 4th of the way', (done) => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.09;
  global.Math = mockMath;

  const game = {
    gameData: {
      get() {
        return {
          hasSabotaged: false,
          textTyped: '1 2 3 4 5',
          text: ['1', '2', '3', '4', '5', '6'],
        };
      },
      set() {},
      keys() { return ['test', 'test1']; },
    },
    lobbyId: done,
  };

  sabotage('test', game);
});

test('sabotage test no sabotage last 3rd of the way', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.2;
  global.Math = mockMath;

  const mock = jest.fn(() => 'test');

  const game = {
    gameData: {
      get() {
        return {
          hasSabotaged: false,
          textTyped: '1 2 3 4 5',
          text: ['1', '2', '3', '4', '5', '6'],
        };
      },
      set() {},
      keys() { return ['test', 'test1']; },
    },
    lobbyId: mock,
  };

  // mock function should never be called because Math.random value is too high to trigger.
  sabotage('test', game);
  expect(mock.mock.calls.length).toBe(0);
});
