import { Prose } from '../../mongo/models/prose';
import { gameLength } from '../gameConfig';

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Generate random text for players to type.
 * @returns Random text for players to type.
 */
export async function getRandomText() {
  const numOfTexts = await Prose.countDocuments();
  const text = await Prose.findById(randomInt(numOfTexts));

  // gets a random index sentence, this will act as the anchor for sentence selection
  let firstSentenceIndex = randomInt(text.sentences.length);
  const gameText = [text.sentences[firstSentenceIndex]];
  let lastSentenceIndex = firstSentenceIndex;

  // final length of text to type will always be at least the specified gameLength
  while (gameText.join(' ').length < gameLength) {
    if (lastSentenceIndex + 1 >= text.sentences.length) {
      // if sentence index overflows, start picking from before firstSentenceIndex
      firstSentenceIndex -= 1;
      // if index is less than zero, then all text in file has been selected
      if (firstSentenceIndex < 0) {
        return gameText;
      }
      gameText.unshift(text.sentences[firstSentenceIndex]);
    } else {
      lastSentenceIndex += 1;
      gameText.push(text.sentences[lastSentenceIndex]);
    }
  }
  return gameText;
}
