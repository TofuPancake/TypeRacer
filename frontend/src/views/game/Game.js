import PlayerArena from '../components/game/playerArena/PlayerArena';
import TextArena from '../components/game/textArena/TextArena';
import Countdown from '../components/game/countdown/Countdown';
import GameTimer from '../components/game/gameTimer/GameTimer';
import Sabotage from '../components/game/sabotage/Sabotage';
import styles from './Game.module.css';

import { AppContext } from '../../AppContextProvider';
import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { getSocket } from '../../sockets';
import * as SocketOn from '../../sockets/on'
import * as SocketEmit from '../../sockets/emit'

import { calculateWPM } from '../utils/timeUtils';
import Help from '../components/help/Help';
import { Grid } from '@material-ui/core';
import { GAME_LENGTH_SECONDS } from '../../gameConfig';

export default function Game() {
  const history = useHistory();

  const [playerText, setPlayerText] = useState('');
  const { lobbyid, username, firebaseUserIdToken, audio } = useContext(AppContext);
  const [otherPlayers, setOtherPlayers] = useState(undefined);
  const [text, setText] = useState('');

  const [countdown, setCountdown] = useState(5);
  const [gameTimeLeft, setGameTimeLeft] = useState(GAME_LENGTH_SECONDS);
  const [gameStarted, setGameStarted] = useState(false);

  const [sabotage, setSabotage] = useState(null);
  const [sabotageInfo, setSabotageInfo] = useState(null);

  const wpm = calculateWPM(playerText, gameTimeLeft);

  function handleWordTyped(word) {
    const oldText = playerText;
    SocketEmit.updatePlayerProgress(getSocket(), lobbyid , oldText + word, firebaseUserIdToken, wpm);
    setPlayerText(oldText + word)
  }

  function handleTransferText(text) {
    const joinedText = text.join(' ');
    setText(joinedText);
  }

  function endGame(results) {
    history.push({
      pathname: '/results',
      state: {results},
    })
  }

  function handleSabotage(sabotagedSocketId, data) {
    const playerSocketId = getSocket().id;
    if (playerSocketId === sabotagedSocketId) {
      setSabotage(data);
    }

    setSabotageInfo({...data, sabotaged: sabotagedSocketId});

    // TODO: create an effect on every else's screen
  };
  
  function handleUpdateGame(game) {
    const otherPlayerObjects = game.filter((player) => player.name != getSocket().id);
    setOtherPlayers(otherPlayerObjects);
  }

  function handleCountdown(count) {
    if (count === 'Start') {
      setTimeout(() => setGameStarted(true), 1000); // Clear countdown after one second
    }
    setCountdown(count);
  }

  useEffect(() =>{
    window.history.replaceState('', '', '/game');
    SocketOn.transferText(getSocket(), handleTransferText);
    SocketOn.countdown(getSocket(), handleCountdown);
    SocketOn.getGameTimeLeft(getSocket(), setGameTimeLeft);
    SocketOn.updateGame(getSocket(), handleUpdateGame);
    SocketOn.sabotage(getSocket(), handleSabotage)
    SocketOn.endGame(getSocket(), endGame);

    audio.play();

    return () => {
      audio.pause();
    }
  },[])

  return (
    <div className={styles.game}>
      <div className={styles.help}>
        <Help>
          <h1>Help: Game</h1>
          <hr></hr>
          <p>Type the text presented to you! There will be an inital 5 second countdown, and then all players receive 5 minutes to play the game. The game ends once a player has finished typing all the text or the timer reaches 0.</p>
          <p>Sabotages are automatic. This means, once you have typed a certain amount of text a sabotage will be sent to another player. Currently there are two types of sabotages blind , mixup and confusion.</p>
        </Help>
      </div>
      <GameTimer gameTimeLeft={gameTimeLeft} />

      <div className={styles.inner}>
        <div className={styles.column + ' ' + styles.playerGame}>
          <Countdown hasGameStarted={gameStarted} count={countdown} />
          <Grid container direction='row' alignItems='center' justify='flex-start'>
            <span className={styles.name}>{`NAME: ${username}`}</span>
            <span className={styles.wpm}>{`WPM: ${wpm}`}</span>
          </Grid>
          <TextArena gameText={text} playerText={playerText} onWordTyped={handleWordTyped} sabotage={sabotage} />
        </div>

        <div className={styles.column}>
          <PlayerArena players={otherPlayers} secondsElapsed={gameTimeLeft} />
        </div>
      </div>

      <div className={styles.sabotageList}>
            <Sabotage className={styles.sabotage} saboteurInfo={sabotageInfo} sabotagedInfo={sabotageInfo} />
          </div>
    </div> 
  );
}
