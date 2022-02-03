import { TextField, Button } from '@material-ui/core';
import styles from './Home.module.css';
import useStyles from '../styleOverrides/buttons';
import useHomeStyles from './Home.override';
import { useHistory } from 'react-router-dom';
import Leaderboard from '../components/leaderboard/Leaderboard'
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContextProvider';
import { getSocket, initSocket } from '../../sockets';

import * as SocketEmit from '../../sockets/emit';
import * as SocketOn from '../../sockets/on';
import tofupancake from '../../images/tofupancake.png';
import Help from '../components/help/Help';

function Home() {
  const history = useHistory();
  const { username, setUsername, lobbyid, setLobbyid, setLobby, firebaseUserIdToken } = useContext(AppContext);
  const [usernameError, setUsernameError] = useState(false);
  const [lobbyIdError, setLobbyIdError] = useState(false);

  useEffect(() => {
      initSocket();
      SocketOn.updateLobby(getSocket(), setLobby);
  }, []);

  const classes = useStyles();
  const homeClasses = useHomeStyles();

  return (
    <div className={styles.home}>
    {window.history.replaceState('', '', '/')}
      <h1 className={styles.title}>Tofu Pancake</h1>
      <div className={styles.logo}>
        <img onClick={reloadHome} src={tofupancake} className={styles.tofupancakeLogo} />
      </div>
      <div className={styles.leaderboard}>
        <Leaderboard />
      </div>
      <div className={styles.help}>
        <Help>
          <h1>Help: Home</h1>
          <hr></hr>
          <p>Welcome to Tofu Pancake. A type racing game. To dismiss this pop-up simply click outside of the box.</p> 
          <p>You are currently on the Home screen. Here you can create a new game, join an existing game, login, and view the leaderboard.
          To view match history, first you must login (top left corner), then click on the avatar icon and click profile.</p>
        </Help>
      </div>

      <div className={styles.input}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>
                <TextField
                  error={usernameError}
                  helperText={usernameError && 'Username cannot be empty.'}
                  label='Name'
                  variant='outlined'
                  className={homeClasses.label}
                  value={username}
                  onChange={e => {
                    setUsernameError(false);
                    setUsername(e.target.value);
                  }}
                />
              </td>
              <td>
                <TextField
                  error={lobbyIdError}
                  helperText={lobbyIdError && 'LobbyId cannot be empty, when joining a game.'}
                  label='Lobby ID'
                  variant='outlined'
                  className={`${homeClasses.label} ${styles.lobbyIdInput}`}
                  value={lobbyid}
                  onChange={e => {
                    setLobbyIdError(false);
                    setLobbyid(e.target.value.toUpperCase());}}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Button className={`button ${styles.item} ${homeClasses.homeButton} ${classes.button}`} onClick={() => createGame()}>
                  Create Game
                  </Button>
              </td>
              <td>
                <Button disabled={username.length === 0} className={`button ${styles.item} ${homeClasses.homeButton} ${styles.createGameBtn} ${classes.button}`} onClick={() => joinGame()}>
                  Join Game
                  </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  function createGame() {
    if (!username || username === '') {
      setUsernameError(true);
      return;
    }
    SocketEmit.createLobby(getSocket(), username, firebaseUserIdToken, setLobbyid);
    history.push('/lobby');
  }

  function joinGame() {
    if (!lobbyid || lobbyid === '') {
      setLobbyIdError(true);
      return;
    }
    if (!username || username === '') {
      setUsernameError(true);
      return;
    }
    SocketEmit.joinLobby(getSocket(), lobbyid, username, firebaseUserIdToken, handleJoinGameErr) // very dodgy fix
    history.push('/lobby');
  }

  function handleJoinGameErr(err) {
    alert(err);
    history.goBack();
  }

  function reloadHome() {
    history.go(0);
  }
}

export default Home;
