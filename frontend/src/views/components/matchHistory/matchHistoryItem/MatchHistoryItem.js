import { Collapse } from 'material-ui-next';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import styles from './MatchHistoryItem.module.css';
import MatchPlayersList from './matchPlayersList/MatchPlayersList';

const useStyles = makeStyles(() => ({
    collapse: {
        width: 'inherit'
    }
}))

export default function MatchHistoryItem({match}){
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    function handleMouseEnter() {
        setOpen(true);
    };

    function handleMouseLeave() {
        setOpen(false);
    };

    return(
        <Collapse className={classes.collapse} in={open} collapsedSize={40}>      
            <div className={styles.matchHistoryContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> 
                <div className={styles.matchHistoryTitle}>
                    <h1 className={styles.placeText}>#{match.place} </h1><h1 className={styles.wpmText}> WPM: {match.wpm}</h1> 
                    <h2 className={styles.dateText}>{match.date}</h2>
                </div>
                <div  className={styles.gameInfo}>
                    <div  className={styles.textTypedContainer}>
                        <p>Typed: </p><p className={styles.textTyped}>{match.textTyped} </p>
                    </div>
                    <MatchPlayersList players={match.otherPlayers}/>
                </div>
            </div>
        </Collapse>
    );
}
