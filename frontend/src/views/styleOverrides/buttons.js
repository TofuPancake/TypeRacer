import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    button: {
      color: 'white',
      backgroundColor: '#31326f',
      boxShadow: '0 0 0 2.5px rgb(68, 55, 55), 3px 3px 0 3px rgba(159, 158, 158, 0.644)',
      borderBottom: '#f5f2f2 solid 0.1px',
      borderRadius: '10px',
      '&:hover': {
        transform: 'scale(1.05)',
        backgroundColor: '#31326f', 
        boxShadow: '0 0 0 2.5px rgb(68, 55, 55), 3px 3px 0 3px rgba(159, 158, 158, 0.644)',
      },
      '&:disabled': {
        opacity: '0.8',
        color: 'white',
      }
    },
    redButton: {
        backgroundColor: '#d05e5e',
        '&:hover': {
            backgroundColor: '#d05e5e',
          },
    },
});

export default useStyles;
