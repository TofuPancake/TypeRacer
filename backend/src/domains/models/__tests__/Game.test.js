import { TIMEOUT_MS } from '../../testConfig';
import { Game } from '../Game';

jest.mock('../../../sockets/emit/index.js');
jest.mock('../../utils/randomTextUtil.js');
jest.mock('../../utils/saveGame.js');
jest.mock('../../../sockets/index.js');
jest.setTimeout(TIMEOUT_MS);

test('Game startGame test', (done) => {
  const game = new Game(done, 'testHost');
  game.startGame();
});

test('Game endGame test', (done) => {
  const game = new Game(done, 'testHost');
  game.endGame();
});

test('Game updateGameData game not finished test', (done) => {
  const mock = jest.fn();
  mock.mockImplementation(() => { });
  const game = new Game(mock, 'testHost');
  game.gameData.set('test', { textTyped: '', text: ['test', 'text'] });
  game.updateGameData('test', 'test');
  expect(mock).not.toHaveBeenCalled();
  done();
});

test('Game updateGameData game finished test', (done) => {
  const game = new Game(done, 'testHost');
  game.finished = false;
  game.gameData.set('test', { textTyped: '', text: ['test', 'text'] });
  game.updateGameData('test', 'test text');
});
