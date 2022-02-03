import { Button } from '@material-ui/core';
import LeaderboardComponent from '../components/leaderboard/Leaderboard';

import styles from './Leaderboard.module.css';
import useStyles from '../styleOverrides/buttons';

export default function Leaderboard() {
    const classes = useStyles();

    return (
        <div className={styles.center} >
            <div className={styles.component}>
                <LeaderboardComponent />
            </div>
            <Button className={`${classes.button} ${classes.redButton} ${styles.exitButton}`} onClick={() =>  window.history.back()}>Exit</Button>
        </div>
    );
}
