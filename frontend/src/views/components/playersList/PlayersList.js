import styles from './PlayerList.module.css';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import { getSocket } from '../../../sockets';

export default function PlayersList({ players }) {
    const socketId = getSocket().id;

    return (
        <div className={styles.playerList}>
            <Grid container spacing={3}>
            {
                players.map((player, index) => {
                    return  <Grid key={index} item xs={12} sm={6}>
                                <div className={`${styles.player} ${player.socketId === socketId ? styles.you : ''}`}>
                                    <div className={styles.avatar}>
                                        <Avatar src={player.photoURL} />
                                    </div>
                                    <div className={styles.name}>
                                        {player.name}
                                    </div>
                               </div>
                            </Grid>
                })
            }
            </Grid>

        </div>

    );
}
