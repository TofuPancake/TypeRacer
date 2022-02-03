import styles from '../components/game/textArena/TextArena.module.css';
import { shouldBlindPlayer } from './sabotageUtils';

/**
 * Highlight TYPED characters with either green or red, depending whether it is correct or incorrect.
 * This will differ if blind is in play.
 * @returns Boolean array 
 */
export function highlightCharacter(character, index, correctlyTypedCharacters, sabotage) {
    let characterClass;
    if (index >= correctlyTypedCharacters.length) {
        characterClass = styles.toTypeCharacter;
    } else if (correctlyTypedCharacters[index]) {
        characterClass = styles.correctCharacter;
    } else {
        characterClass = styles.incorrectCharacter;
    }

    if (shouldBlindPlayer(sabotage, index, correctlyTypedCharacters)) {
        characterClass = styles.hiddenCharacter;
    }
    return <span key={index} className={characterClass}>{character}</span>
}
