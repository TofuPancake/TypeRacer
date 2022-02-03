import { generateTimerString } from '../../../utils/timeUtils';
import styles from './GameTimer.module.css';

export default function GameTimer({ gameTimeLeft }) {
    return (
        <div className={styles.gameTimer}>
            <h3>TIME LEFT</h3>
            <h1>{generateTimerString(gameTimeLeft)}</h1>
        </div>
    );
}