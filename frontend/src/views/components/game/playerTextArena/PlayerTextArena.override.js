import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    playerCard: {
        height: '150px',
        position: 'relative',
        margin: '5%',
      
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      
        boxShadow: '0 0 0 2.5px rgb(68, 55, 55), 3px 3px 0 6px rgba(159, 158, 158, 0.644)',
        borderRadius: '10px',
        borderBottom: '#f5f2f2 solid 0.1px',
    },
    playerScorePlate: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      
        position: 'absolute',
        bottom: '0',
        height: 'fit-content',
        width: '100%',
        padding: '1% 0 4% 0',
      
        backgroundColor: '#ffdada',
    },
});

export default useStyles;