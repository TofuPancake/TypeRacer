import { PlayerInfo } from '../models/PlayerInfo';

export class LobbyRegister {
  static createLobby() {
    return {
      game: {
        startGame() {},
        gameData: {
          set() {},
        },
      },
      addUser() {
      },
      lobbyId: 'test',
    };
  }

  static getLobby(id) {
    if (id === 'test') {
      return {
        game: {
          startGame() {},
          gameData: {
            set() {},
          },
          updateGameData() {},
          playerInfoRegister: {
            get() {
              return new PlayerInfo('test', null, '10');
            },
          },
        },
        addUser() {
        },
        removeUser() {},
        containsName() {},
        containsAccount() {},
      };
    }
    return {
      game: {
        startGame() {},
        gameData: {
          set() {},
        },
        updateGameData() {},
        playerInfoRegister: {
          get() {
            return new PlayerInfo('test', '1234', '10');
          },
        },
      },
      addUser() {
      },
      removeUser() {},
      containsName() {},
      containsAccount() {},
    };
  }

  static lobbyExists(id) {
    return id === 'test';
  }

  static removeLobby() {

  }
}
