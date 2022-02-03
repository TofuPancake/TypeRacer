import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import MatchHistory from '../components/matchHistory/MatchHistory';
import styles from './Profile.module.css';
import useProfileStyles from './Profile.override';
import useStyles from '../styleOverrides/buttons';
import useGet from '../../hooks/useGet';
import { AppContext } from '../../AppContextProvider';

function Profile() {
    const history = useHistory();
    const { firebaseUserIdToken } = useContext(AppContext);
    const [ matchHistory, setMatchHistory ] = useState([]);
    const { data, reFetch } = useGet('/api/match-history/');

    useEffect(() => {
        if (firebaseUserIdToken) {
            setMatchHistory(null); // Reset match history
            reFetch();
        } else {
            setMatchHistory([]); // There is no match history for no users.
        }
    }, [firebaseUserIdToken]);

    useEffect(() => {
        if (data) {
            setMatchHistory(data);
        }
    }, [data]);

    const classes = useStyles();
    const profileClasses = useProfileStyles();

    return (
      <div className={styles.profilePage}>
          <MatchHistory matchHistory={matchHistory}/>
                  <Button className={`${profileClasses.goBackButton} ${classes.button} ${classes.redButton}`} onClick={toLobby}>
              go back
          </Button>
      </div>
    );

    function toLobby(){
        history.goBack();
    }
  
}

export default Profile;
