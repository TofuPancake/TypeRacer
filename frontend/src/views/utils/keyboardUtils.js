/**
 * Apply the keypressed to the text. Will return a String with the result of the key pressed
 * e.g. the result would be the text passed in + a new character at the end. Or if the key pressed
 * was a backspace, there would be one less character in the result.
 * @param {*} text 
 * @param {*} keyPressed 
 * @returns 
 */
export function applyKeyPressed(text, keyPressed) {
    if (keyPressed.match(/^[!-~]$/)) { // Process a printable character
        return text + keyPressed;
    }
    
    // Non-printable character exception handling
    if (text.length > 0) {
        if (keyPressed === 'Backspace') {
            return text.substring(0, text.length - 1);
        } else if (keyPressed === ' ') {
            return text + ' ';
        }
    }

    return text;
}

/**
 * Get the next character that the player must type
 * @param {String} text 
 * @param {*} playerText total text the player has typed, including those that may not be correct
 * @param {*} keyPressed the key that has just been pressed
 * @returns 
 */
export function hasPlayerFinished(fullText, currentPlayerText, keyPressed) {
    const typedText = applyKeyPressed(currentPlayerText, keyPressed);
    return typedText === fullText;
}

/**
 * Gets the current word that the user has to type for
 * @param {String} text 
 * @param {String} playerText total text the player has typed, including those that may not be correct
 * @returns 
 */
export function currentWord(text, playerText) {
    const textArr = text.split(' ');
    const playerTextArr = playerText.split(' ');
    const textLength = textArr.length;
    const playerTextLength = playerTextArr.length;

    // Number of words a player types cannot exceed the original text's
    if (playerTextLength > textLength) {
        return null;
    }
    return textArr[playerTextLength - 1];
}

/* Returns an boolean array, true if characters are the same.
   PlayerText should include currently typedWord.
   */
export function recalculateCorrectCharacters(text, playerText) {
    let ret = [];
    for(let i = 0; i < playerText.length; i++) {
        if (text.charAt(i) === playerText.charAt(i)) {
            ret.push(true);
        } else {
            ret.push(false)
        }
    }
    return ret;
}