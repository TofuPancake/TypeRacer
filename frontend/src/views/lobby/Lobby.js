import { Button, Box } from '@material-ui/core';
import PlayersList from '../components/playersList/PlayersList';
import styles from './Lobby.module.css';
import useStyles from './Lobby.override';
import useButtonStyles from '../styleOverrides/buttons';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../AppContextProvider';
import { getSocket } from '../../sockets';
import * as SocketOn from '../../sockets/on';
import * as SocketEmit from '../../sockets/emit';

import tofupancake from '../../images/tofupancake.png';
import Help from '../components/help/Help';

function Lobby() {
  const history = useHistory();
  const { lobbyid, lobby } = useContext(AppContext);
  const classes = useStyles();
  const buttonClasses = useButtonStyles();

  useEffect(() => {
    SocketOn.countdown(getSocket(), startGame);
  },[])

  useEffect(() => {
    if (!lobbyid) {
      history.goBack();
    }
    
    if (lobby || lobbyid) {
      window.history.replaceState('', '', lobbyid);
    }

  }, [lobbyid, lobby]);

  return (
    <div>
      <div className={styles.header} onClick={goBackHome}>
        <img width='100' height='80' src={tofupancake} className={styles.tofupancakeLogo} />
        <h1 className={styles.title}>TofuPancake</h1>
      </div>
      <div className={styles.lobbyIDContainer}>
        <label className={styles.lobbyIDLabel}>Lobby ID</label>
        <h1 className={styles.lobbyID}>{lobbyid}</h1>
      </div>
      <div className={styles.help}>
        <Help>
          <h1>Help: Lobby</h1>
          <hr></hr>
          <p>The lobby code is on the top right corner. Share the code with your friends and wait for them to join. Only the lobby creator can start the game.</p>
        </Help>
      </div>
      {
        lobby &&
        <div>
          <div className={styles.lobbyContent}>
            <div className={styles.lobbyContentItem}>
              <PlayersList players={lobby.players} />
            </div>
          </div>
          <Box className={styles.buttonContainer}>
          <Button className={`${buttonClasses.button} ${buttonClasses.redButton} ${classes.lobbyButton}`} variant='contained' size='large' onClick={() => goBackHome()}>Exit</Button>
          {
            getSocket().id === lobby.host && 
              <Button className={`${buttonClasses.button} ${classes.lobbyButton} ${classes.startButton}`} variant='contained' size='large' onClick={() => SocketEmit.initializeGame(getSocket(), lobbyid)}>
                Start!
              </Button>
          }
          </Box>
        </div>      

      }

    </div>
  );

  function startGame() {
    history.push('/game');
  }

  async function goBackHome() {
    await getSocket().disconnect();
    await getSocket().connect();
    window.history.back();
  }
}

export default Lobby;
