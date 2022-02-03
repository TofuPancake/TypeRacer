import { Grid } from '@material-ui/core';
import { calculateWPM } from '../../../utils/timeUtils';
import styles from './PlayerArena.module.css';
import PlayerTextArena from '../playerTextArena/PlayerTextArena';

export default function PlayerArena({ players, secondsElapsed }) {

    return (

        <Grid container className={styles.playerArena}>
          {players && players.map((player, index) => (
            player && 
            <PlayerTextArena playerSocketId={player.name} 
              fullText={player.value.text} 
              textTyped={player.value.textTyped} 
              wpm={calculateWPM(player.value.textTyped, secondsElapsed)}
              key={index} />
          ))}
        </Grid>
    );
}
