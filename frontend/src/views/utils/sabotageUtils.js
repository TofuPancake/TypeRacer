import { SABOTAGE_BLIND_VIEW_LENGTH, SABOTAGE_CONFUSION_LENGTH} from '../../gameConfig';

const specialCharacters = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 
'_', '-', '+', '=', '{', '[', '}', ']', '|', '\\', ':', ';', 
'"', '\'', '<', ',', '>', '.', '?', '/'];

/**
 * This handles mainly confusion and mixup sabotages. It will concantenate or swap around words on the currentText,
 * and return the modified text back to the frontend for the user to enjoy.
 * @param {*} sabotage the sabotage to apply
 * @param {*} currentText current text that the user has to type for
 * @param {*} correctlyTypedCharacters current correct words
 * @param {*} setText method to set the new text
 */
export function handleSabotage(sabotage, currentText, correctlyTypedCharacters, setText) {
  if (sabotage?.type === 'confusion') {
    let newSpecialCharacters = '';
    for (let i = 0; i < SABOTAGE_CONFUSION_LENGTH && i < currentText.length - correctlyTypedCharacters.length; i++) {
      const character = specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
      newSpecialCharacters = newSpecialCharacters + character;
    }
    const newText = currentText.substr(0, correctlyTypedCharacters.length) + newSpecialCharacters + 
                    currentText.substr(correctlyTypedCharacters.length + SABOTAGE_CONFUSION_LENGTH);
    // reset so we only sabotage once. Also if we want to sabotage with two of the same type later 
    // we can ensure it triggers the effect hook.
    sabotage.type = ''; 
    setText(newText);
  } else if (sabotage?.type === 'mixup'){
    const words = currentText.substr(correctlyTypedCharacters.length).split(' ');
    if(words.length > 1){
      const tempWord = words[0];
      words[0] = words[1];
      words[1] = tempWord;
    }
    const newText = currentText.substr(0, correctlyTypedCharacters.length) + words.join(' ')
  
    sabotage.type = ''; 
    setText(newText);
  }
}

/**
 * Returns a boolean on whether a player should be blinded or not. They should only be blinded when the blind length
 * does not exceed the text to type left.
 */
export function shouldBlindPlayer(sabotage, index, correctlyTypedCharacters) {
    return sabotage?.type === 'blind' && index >= correctlyTypedCharacters.length + SABOTAGE_BLIND_VIEW_LENGTH;
}