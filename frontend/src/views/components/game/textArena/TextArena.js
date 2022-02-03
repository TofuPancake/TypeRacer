import styles from './TextArena.module.css';
import * as textHighlighting from '../../../utils/textHighlightingUtils';
import useStyles from './TextArena.override';

import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { hasPlayerFinished, currentWord, applyKeyPressed, recalculateCorrectCharacters } from '../../../utils/keyboardUtils';
import { handleSabotage } from '../../../utils/sabotageUtils';

export default function TextArena({ gameText, playerText, onWordTyped, sabotage }) {
    const [disableTextField, setDisableTextField] = useState(true);

    // This is updated AFTER the keyDown event. So this is always one step behind the latest key input
    const [typedWord, setTypedWord] = useState('');
    
    const [correctlyTypedCharacters, setCorrectlyTypedCharacters] =  useState([]);
    const [correctlyTypedCharactersForCurrentWord, setCorrectlyTypedCharactersForCurrentWord] = useState([]);
    const [text, setText] = useState(gameText);

    const classes = useStyles();

    let typeField;

    useEffect(() => {
        if (text) {
            setDisableTextField(false);
            typeField.disabled = false;
            typeField && typeField.focus();
        }
    }, [text]);

    /** This is required because the gameText is only sent sometime after the
     * TextArena component is first rendered.
     */
    useEffect(() => {
      setText(gameText);
    }, [gameText]);

    useEffect(() => {
        handleSabotage(sabotage, text, correctlyTypedCharacters, setText);
    }, [sabotage])

    function handleKeyDown(e) {
        if (!text) {
            return;
        }

        retrieveAndSetCorrectCharacters(text, playerText, typedWord, e.key);

        if (hasPlayerFinished(text, playerText + typedWord, e.key)) {
            const finalWord = applyKeyPressed(typedWord, e.key);
            onWordTyped(finalWord);
            setDisableTextField(true);
            return;
        }

        if (typedWord != currentWord(text, playerText + typedWord)) {
            return;
        }
        
        if (e.code === 'Space') { // e.code gives 'Space', e.key gives ' ' -- e.code is more readable
            sendCorrectlyTypedWord(typedWord + ' ');
            return;
        }
    }

    function retrieveAndSetCorrectCharacters(fullText, playerWordsTyped, typedText, keyPressed) {
        const totalTypedText = applyKeyPressed(typedText, keyPressed);
        const currentWordToType = currentWord(fullText, playerWordsTyped);
        const calculatedCorrectCharacters = recalculateCorrectCharacters(currentWordToType, totalTypedText);
        setCorrectlyTypedCharactersForCurrentWord(calculatedCorrectCharacters);
    }

    function sendCorrectlyTypedWord(correctWord) {
        onWordTyped(correctWord);
        setTypedWord('');
        const newCorrectlyTypedCharacterBools = [...correctlyTypedCharacters, ...correctlyTypedCharactersForCurrentWord, true];
        setCorrectlyTypedCharacters(newCorrectlyTypedCharacterBools);
        setCorrectlyTypedCharactersForCurrentWord([]);
    }
    
    return (
        <div className={styles.textArena}>
            <TextField 
            autoFocus
            disabled={disableTextField}
            tabIndex={-1}
            onChange={(e) => {
                if (e.target.value === ' ') {
                    return;
                }
                setTypedWord(e.target.value)}
            }
            onKeyDown={(e) => {handleKeyDown(e)}}
            value={typedWord} 
            inputRef={input => { typeField = input; }}
            className={classes.root}
            />

            <div className={styles.text}>
                {text ?
                    [...text].map((character, index) =>
                        textHighlighting.highlightCharacter(character, index, 
                        [...correctlyTypedCharacters, ...correctlyTypedCharactersForCurrentWord], sabotage))
                    : <span>Loading...</span>
                }
            </div>
        </div>
    )
}
