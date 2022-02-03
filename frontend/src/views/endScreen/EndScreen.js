import { Button, Box, Avatar } from '@material-ui/core';
import PlayerRankingRow from '../components/playerRankingRow/PlayerRankingRow';
import { AppContext } from '../../AppContextProvider';
import { useContext, useEffect, useState } from 'react'
import styles from './EndScreen.module.css';
import useStyles from '../styleOverrides/buttons';
import useEndScreenStyles from './EndScreen.override';
import { useHistory, useLocation } from 'react-router-dom';
import { getSocket } from '../../sockets';

export default function EndScreen() {
  const history = useHistory();
  const location = useLocation();
  const { lobby } = useContext(AppContext);
  const [players] = useState([...lobby.players]);
  const [winner, setWinner] = useState();
  
  const classes = useStyles();
  const endScreenClasses = useEndScreenStyles();

  useEffect(() => {
    const results = location.state.results;
    players.map((player) => {
      let info;
      for(const playerInfo of results){
        if(playerInfo.name == player.socketId){
          info = playerInfo;
          break;
        }
      }
      player.wpm = info.value.wpm;
    })

    players.sort((a,b ) => b.wpm - a.wpm)
    setWinner(players.shift());
  },[]);

  return (
    <div className={styles.endScreen}>
      <h1>GAME OVER</h1>

      <div className={styles.podium}>
        <div className={styles.winner}>
          <h3>WINNER: {winner ? winner.name: null}</h3>
          {winner && winner.photoURL ? <Avatar className={styles.winnerAvatar} src={winner.photoURL} /> : <Avatar className={styles.winnerAvatar} />}
          <h3>WPM: {winner ? winner.wpm : null}</h3>
        </div>
        <div className={styles.nonWinners}>
          {
            players && players.map((player, index) => (
              <PlayerRankingRow key={index} rank={index + 2} player={player} />
            ))
          }
        </div>
      </div>

      <Box className={styles.buttonContainer}>
        <Button className={`${classes.button} ${classes.redButton} ${endScreenClasses.endScreenButton}`} onClick={() => goBackHome()}>Exit Lobby</Button>
        <Button className={`${classes.button} ${endScreenClasses.endScreenButton}`} onClick={() => newGame()}>Play Again</Button>
      </Box>
    </div>
  );

  async function goBackHome() {
    await getSocket().disconnect();
    await getSocket().connect();
    window.history.back();
  }

  function newGame() {
    history.push('/lobby');
  }
}
