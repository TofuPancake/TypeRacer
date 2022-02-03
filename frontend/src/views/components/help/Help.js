import Modal from '../modal/Modal';
import { useState } from 'react';
import HelpIcon from '@material-ui/icons/Help';
import { Paper } from '@material-ui/core';

import styles from './Help.module.css';

export default function Help({ children }) {
    const [show, setShow] = useState(false);
    
    function handleCancelHelp() {
        setShow(false);
    }

    function handleShowHelp() {
        setShow(true);
    }


    return(
        show ? 
        <Modal style={{ width: '50%'}} dismissOnClickOutside={true} onCancel={handleCancelHelp}>
            <div className={styles.paper}>
                {children}
            </div>
        </Modal>
        :
        <div className={styles.button} onClick={handleShowHelp}><HelpIcon fontSize='large' color='action' /></div>
    );
}