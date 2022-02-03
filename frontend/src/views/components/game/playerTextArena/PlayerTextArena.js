import { Card, CardHeader, CardContent, Typography, Avatar, LinearProgress, Grid } from '@material-ui/core'
import styles from './PlayerTextArena.module.css'
import useStyles from './PlayerTextArena.override';

import { useState, useEffect, useContext } from 'react';
import { getPlayerName, getPlayerPicture } from '../../../utils/playerUtils';
import { AppContext } from '../../../../AppContextProvider';

export default function PlayerArena({ playerSocketId, fullText, textTyped, wpm }) {
    const [progress, setProgress] = useState(0);
    const { lobby } = useContext(AppContext);
    const classes = useStyles();

    function calculateProgress(textTypedLength, fullTextLength) {
        return Math.floor(textTypedLength / fullTextLength * 100);
    }

    useEffect(() => {
        if (textTyped && fullText) {
            const fullTextString = fullText.join(' ');
            const progress = calculateProgress(textTyped.length, fullTextString.length);
            setProgress(progress);
        }
    }, [textTyped]);

    return (
        <div className={getPlayerName(playerSocketId, lobby) ? styles.player : styles.gonePlayer}>
            <Card className={classes.playerCard}>
                <CardHeader className={styles.playerPlate}
                avatar={
                    getPlayerPicture(playerSocketId, lobby) ? <Avatar className={styles.avatar} src={getPlayerPicture(playerSocketId, lobby)} /> : <Avatar className={styles.avatar} />
                }
                title={getPlayerName(playerSocketId, lobby)}
                align='left' 
                />
                <Grid className={styles.cardContent}>
                    <CardContent className={styles.textContainer}>
                        <Typography align='left' className={styles.text}>
                            {textTyped}
                        </Typography>
                    </CardContent>
                    <CardContent className={classes.playerScorePlate}>
                        <Typography>
                            <strong>WPM:</strong> {wpm}
                        </Typography>
                        <LinearProgress variant='determinate' value={progress} />
                    </CardContent>
                </Grid>
            </Card>
        </div>
    )
}