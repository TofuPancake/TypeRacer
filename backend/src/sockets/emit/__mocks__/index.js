export function countdown(done, start) {
  if (start === 'Start') { done(); }
}
export function transferText(_lobbyId, text) {
  if (text[0] !== 'test1' || text[1] !== 'test2') {
    throw new Error('incorrect text');
  }
}
export function endGame(done) { done(); }
export function updateLobby(done) {
  if (done !== 'test') {
    done();
  }
}
export function updateGame(done, gameData) {
  expect(gameData).toBeInstanceOf(Map);
  done();
}

// eslint-disable-next-line no-unused-vars
export function sabotage(done, _key, _sabotageData) {
  done();
}
