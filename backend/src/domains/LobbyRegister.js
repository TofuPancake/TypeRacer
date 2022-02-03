// eslint-disable-next-line import/no-cycle
import { Lobby } from './models/Lobby';

const lobbies = new Map();

export class LobbyRegister {
  static createLobby(host) {
    const newId = this.createLobbyId();
    const lobby = new Lobby(host, newId);
    lobbies.set(lobby.lobbyId, lobby);
    return lobby;
  }

  static lobbyExists(lobbyId) {
    return lobbies.has(lobbyId);
  }

  static getLobby(lobbyId) {
    return lobbies.get(lobbyId);
  }

  static removeLobby(lobbyId) {
    lobbies.delete(lobbyId);
    console.log(`removed lobby with id: ${lobbyId}`);
  }

  static createLobbyId() {
    let newId = this.getNewId();
    while (LobbyRegister.lobbyExists(newId)) {
      newId = this.getNewId();
    }

    return newId;
  }

  static getNewId() {
    /* This uses the math.random() library to generate a base 36 number (numbers + letters).
    The number is a decimal so we want the characters after the decimal point, hence we use numbers
    from index 2. 5 is the number of characters that we want in the id. */
    return Math.random().toString(36).substr(2, 5).toUpperCase();
  }
}

export default new LobbyRegister();
