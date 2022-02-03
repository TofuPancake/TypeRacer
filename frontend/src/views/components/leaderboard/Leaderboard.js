import React from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@material-ui/core';
import styles from './Leaderboard.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGet from '../../../hooks/useGet';

export default function Leaderboard() {
  const [selectPlayer, setSelectPlayer] = useState();
  const [ players, setPlayers ] = useState([]);

  const { data } = useGet('/api/leaderboard/');

  useEffect(() => {
    if (data) {
        const tempPlayers = [];
        data.forEach((player) => {
            const tempPlayer = {
                name: player.name ? player.name : 'Guest',
                score: player.gameRecords?.length ? player.gameRecords.length : 0,
                _id: player._id,
                photoURL: player.photoURL,
            };
            tempPlayers.push(tempPlayer);
        });
        setPlayers(tempPlayers);
    }
}, [data]);

  return (
    <div>    
      <List className={styles.leaderboard}>
          <Link className={styles.leaderboardLink} to='/leaderboard'>
            <h3>Leaderboard</h3>
            <h6>MOST GAMES PLAYED</h6>
          </Link>

        { players.length != 0 ?
          players.map((player) => {
            let style = {};
            if (selectPlayer === player._id) {
              style['backgroundColor'] = 'rgba(73, 62, 62, 0.397)';
              style['borderRadius'] = '12px';
            }

            return [
              <div key={player._id}>
                <Divider />
                <ListItem alignItems='flex-start' style={style} onMouseEnter={() => setSelectPlayer(player._id)}>
                  <ListItemAvatar>
                    <Avatar src={player.photoURL} />
                  </ListItemAvatar>
                  <ListItemText className={styles.itemText} primary={player.name ? player.name : 'Guest'} secondary={player.score}></ListItemText>
                </ListItem>
              </div>,
            ];
          })
          : <div><Divider /><ListItem>Nothing here yet!</ListItem></div>
        }
      </List>
    </div>

  );
}
