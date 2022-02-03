import { Avatar, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import styles from './PlayerRankingRow.module.css';
import useStyles from './PlayerRankingRow.override';

function PlayerRankingRow(props) {
  const classes = useStyles();
  
  return (
    <Grid container className={[styles.playerRankingRow, classes.root, props.classes.playerRankingRow].join(' ')}>
      <Grid item xs={6} sm={3}>
        <span>{props.rank}</span>
      </Grid>
      <Grid item xs={6} sm={3}>
        {props.player && props.player.photoURL ? <Avatar src={props.player.photoURL} /> : <Avatar />}
      </Grid>
      <Grid item xs={6} sm={3}>
        <span>{props.player.name}</span>
      </Grid>
      <Grid item xs={6} sm={3}>
        <span>WPM: {props.player.wpm}</span>
      </Grid>
    </Grid>
  );
}

export default withStyles({ playerRankingRow: {} })(PlayerRankingRow);
