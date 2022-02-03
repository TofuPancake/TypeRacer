import { List, ListItem, Divider, makeStyles } from '@material-ui/core';
import styles from './MatchHistory.module.css';
import { useState } from 'react';
import MatchHistoryItem from './matchHistoryItem/MatchHistoryItem';

const useStyles = makeStyles({
  listItem: {
    alignItems: 'center'
  }
})

export default function MatchHistory({ matchHistory }) {
  const classes = useStyles();
  const [selectMatch, setSelectMatch] = useState();

  return (
    <List className={styles.matchHistory}>
      <h3 className={styles.title}>Match History</h3>
      <div className={styles.listContainer}>
        {
          !matchHistory ? <div><Divider /><ListItem className={classes.listItem}>Loading...</ListItem></div>
            : matchHistory.length != 0 ?
              matchHistory.map((match) => {
              let style = {};
              if (selectMatch === match._id) {
                style['backgroundColor'] = 'rgb(255, 255, 255)';
                style['borderRadius'] = '12px';
              }

              return [
                <div key={match._id}>
                  <Divider />
                  <ListItem className={classes.listItem} alignItems='flex-start' style={style} onMouseEnter={() => setSelectMatch(match._id)}>
                      <MatchHistoryItem match={match} />
                  </ListItem>
                </div>,
              ];
            })
            : <div><Divider /><ListItem className={classes.listItem}>No matches. Log in or start playing games!</ListItem></div>
        }
      </div>
    </List>
  );
}
