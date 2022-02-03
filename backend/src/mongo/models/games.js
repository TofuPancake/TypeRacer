import mongoose from 'mongoose';

const { Schema } = mongoose;

const gameSchema = new Schema({
  text: String,
  players: [{ type: Schema.Types.ObjectId, ref: 'RegisteredPlayer' }],
  gameId: String,
}, {
  timestamps: {},
});

const Game = mongoose.model('Game', gameSchema);

export { Game };
