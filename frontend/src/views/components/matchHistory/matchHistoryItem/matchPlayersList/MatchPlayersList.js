import { useState } from 'react';
import { Avatar, List, makeStyles, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    list: {
        width: '18vw',
        marginLeft: '5px',
        justifySelf: 'inline-end',
        minWidth: '100px',
    },
    listItem: {
        paddingTop: '0px',
        paddingBottom: '0px',
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: '0px',
    },
    listItemText: {
        alignSelf: 'center',
        justifySelf: 'flex-end',
        width: '30%',
        marginLeft: '3%',
        marginTop: '1px',
        marginBottom: '1px',
    }
}));

export default function MatchPlayersList({players}){
    const classes = useStyles();
    const [selectPlayer, setSelectPlayer] = useState();

    return (
        <List className={classes.list}>
        {
            players.map((player) => {
                let style = {};
                if (selectPlayer === player._id) {
                style['backgroundColor'] = 'rgb(230, 230, 230)';
                style['borderRadius'] = '12px';
                }
                return(
                    <div key={player._id}>
                        <ListItem className={classes.listItem} alignItems='center' style={style} onMouseEnter={() => setSelectPlayer(player._id)}>
                            <ListItemAvatar>
                                {player && player.photoURL ? <Avatar src={player.photoURL} className={classes.small} /> : <Avatar className={classes.small} />}
                            </ListItemAvatar>
                            <ListItemText className={classes.listItemText} primary={`${player.name}`} secondary={` WPM: ${player.wpm}`} />
                        </ListItem>
                    </div>
                );
            })
        }
        </List>
    )
}