export class PlayerInfo {
  constructor(textTyped, firebaseId, wpm) {
    this.textTyped = textTyped;
    this.firebaseId = firebaseId;
    this.wpm = wpm;
  }

  update(textTyped, firebaseId, wpm) {
    this.textTyped = textTyped;
    this.firebaseId = firebaseId;
    this.wpm = wpm;
  }
}
