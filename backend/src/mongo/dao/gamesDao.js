/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
/**
 * Basic CRUD operations for Game Model.
 */
import { Game } from '../models/games';

export async function createGame(game) {
  const dbGame = new Game(game);
  await dbGame.save();
  return dbGame;
}

export async function retrieveAllGames() {
  return await Game.find();
}

export async function retrieveGame(id) {
  return await Game.findById(id);
}

export async function retrieveGameByGameId(gameId) {
  return await Game.findOne({ gameId }).exec();
}

export async function updateGame(game) {
  const result = await Game.findByIdAndUpdate(game._id, game,
    { new: true, useFindAndModify: false });
  return result;
}

export async function deleteGame(id) {
  await Game.deleteOne({ _id: id });
}
