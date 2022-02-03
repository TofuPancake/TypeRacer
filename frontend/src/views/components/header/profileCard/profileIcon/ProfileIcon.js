import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styles from './ProfileIcon.module.css'
import useStyles from './ProfileIcon.override';


export default function ProfileIcon({ auth, firebaseUserIdToken }) {
    const classes = useStyles();

    return(
        <div className={styles.profileIconContainer}>
            {
                firebaseUserIdToken ?
                <Avatar 
                className={classes.avatar} 
                color='action' 
                fontSize='large'  
                alt={auth?.currentUser?.displayName} 
                src={auth?.currentUser?.photoURL}
                />
            :  <Avatar
                className={classes.avatar}
                fontSize='large'
                color='action' />
            }
        </div>
    )
}