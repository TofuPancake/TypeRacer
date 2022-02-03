import styles from './Sabotage.module.css';
import { useState, useEffect, useContext } from 'react';
import { getSocket } from '../../../../sockets';
import { getPlayerName } from '../../../utils/playerUtils';
import { Fade, Slide } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { AppContext } from '../../../../AppContextProvider';
import useStyles from './Sabotage.override';

const SABOTAGE_INFO_SHOW_DURATION = 3000;

export default function Sabotage({ saboteurInfo, sabotagedInfo }) {
    const [saboteurOpen, setSaboteurOpen] = useState(false);
    const [sabotagedOpen, setSabotagedOpen] = useState(false);
    const { lobby } = useContext(AppContext);
    const classes = useStyles();

    useEffect(() => { // The person that is sabotaging
        if (saboteurInfo?.saboteur === getSocket().id) {
            setSaboteurOpen(true);
            setTimeout(() => setSaboteurOpen(false), SABOTAGE_INFO_SHOW_DURATION);
        }
    }, [saboteurInfo]);

    useEffect(() => { // the person that is sabotaged
        if (sabotagedInfo?.sabotaged === getSocket().id) {
            setSabotagedOpen(true);
            setTimeout(() => setSabotagedOpen(false), SABOTAGE_INFO_SHOW_DURATION);
        }
    }, [sabotagedInfo]);

    return (
        <div className={styles.sabotageContainer}>
            <Slide in={saboteurOpen} direction='right' mountOnEnter unmountOnExit>
                <div className={`${styles.saboteur} ${classes.saboteur}`}>
                    <ArrowForwardIcon fontSize='large' />
                    <span>Attacked {getPlayerName(saboteurInfo?.sabotaged, lobby)} with {saboteurInfo?.type}!</span>
                </div>
            </Slide>
            <Fade in={sabotagedOpen}>
                <div className={styles.sabotaged}>
                    <span>Attacked by {getPlayerName(sabotagedInfo?.saboteur, lobby)} with {sabotagedInfo?.type}!</span>
                </div>
            </Fade>
        </div>
    );
}