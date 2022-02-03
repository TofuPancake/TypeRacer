import styles from './Countdown.module.css';
import { Backdrop } from '@material-ui/core';
import useStyles from './Countdown.override';

export default function Countdown({ count, hasGameStarted }) {
    const classes = useStyles();

    return (
        <Backdrop open={!hasGameStarted} className={classes.countdown}>
            <h1 className={styles.text}>{count}</h1>
        </Backdrop>
    )
}