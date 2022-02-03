import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        height: '20px',
        marginTop: '5%',
        width: '100%',
        '& *': {
            fontSize: 'large',
            color: 'rgba(111, 109, 109, 0.815)',
            backgroundColor: 'rgba(255, 255, 249, 0.911)',
            textAlign: 'center',
            '&::before': {
                transition: 'none',
                borderBottom: 'none',
            },
            '&::after': {
                transition: 'none',
                borderBottom: 'none',
            },
            '&:hover:not(.Mui-disabled):before': {
                transition: 'none',
                borderBottom: 'none',
            }
        }
    }

});

export default useStyles;