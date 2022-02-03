import mongoose from 'mongoose';

const { Schema } = mongoose;

const registeredPlayerSchema = new Schema({
  firebaseUID: String,
  name: String,
  games: [{ type: Schema.Types.ObjectId, ref: 'Game', required: true }],
  gameRecords: [{
    textTyped: String,
    wpm: Number,
  }],
}, {
  timestamps: {},
});

/* const gameRecordScheme = new Schema({
  textTyped: String,
  wpm: Number
})
const gameRecord = mongoose.model('GameRecord', gameRecordScheme); */

const RegisteredPlayer = mongoose.model('RegisteredPlayer', registeredPlayerSchema);

export { RegisteredPlayer };
