import { getRandomText } from '../randomTextUtil';

jest.mock('../../../mongo/models/prose.js');

test('getRandomText test', async (done) => {
  // most of the outcomes are mocked and produced by ../../../mongo/models/prose.js
  expect(await getRandomText()).toStrictEqual(['1', '2', '3']);
  done();
});
