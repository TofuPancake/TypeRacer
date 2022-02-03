/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
/**
 * Basic CRUD operations for Registered Player Model.
 */
import { RegisteredPlayer } from '../models/registeredPlayers';

export async function createRegisteredPlayer(registeredPlayer) {
  const dbRegisteredPlayer = new RegisteredPlayer(registeredPlayer);
  await dbRegisteredPlayer.save();
  return dbRegisteredPlayer;
}

export async function retrieveAllRegisteredPlayers() {
  return await RegisteredPlayer.find();
}

export async function retrieveRegisteredPlayer(id) {
  return await RegisteredPlayer.findById(id);
}

export async function retrieveRegisteredPlayerByFirebaseUID(firebaseUID) {
  return await RegisteredPlayer.findOne({ firebaseUID }).exec();
}

export async function updateRegisteredPlayer(registeredPlayer) {
  const result = await RegisteredPlayer.findByIdAndUpdate(registeredPlayer._id, registeredPlayer,
    { new: true, useFindAndModify: false });
  return result;
}

export async function deleteRegisteredPlayer(id) {
  await RegisteredPlayer.deleteOne({ _id: id });
}
