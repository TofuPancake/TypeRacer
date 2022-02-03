/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import { createGame, updateGame } from '../../../mongo/dao/gamesDao';
import { createRegisteredPlayer, retrieveRegisteredPlayerByFirebaseUID, updateRegisteredPlayer } from '../../../mongo/dao/registeredPlayersDao';
import { RegisteredPlayer } from '../../../mongo/models/registeredPlayers';
import { Game } from '../../../mongo/models/games';
import router from '../matchHistory';

let mongod;
let app;
let server;
jest.mock('../../../firebase/index.js');
jest.setTimeout(7000);
const DEFAULT_CONNECTION_STRING = 'mongodb://localhost:9000';

/**
 * This function begins the process of connecting to the database, and returns a promise that will
 * resolve when the connection is established.
 */
function connectToDatabase(connectionString = DEFAULT_CONNECTION_STRING) {
  return mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

let player1 = null;
let player2 = null;

async function initData() {
  const newGame = await createGame({
    players: [],
  });

  if (!player1) {
    player1 = await createRegisteredPlayer({
      firebaseUID: 'test',
      games: newGame,
      gameRecords: {
        textTyped: 'test',
        wpm: 1,
      },
    });
  } else {
    player1 = await retrieveRegisteredPlayerByFirebaseUID('test');
    player1.games = [...player1.games, newGame];
    player1.gameRecords.push({
      textTyped: 'test',
      wpm: 1,
    });
    await updateRegisteredPlayer(player1);
  }

  if (!player2) {
    player2 = await createRegisteredPlayer({
      firebaseUID: 'test1',
      games: newGame,
      gameRecords: {
        textTyped: 'test1',
        wpm: 2,
      },
    });
  } else {
    player2 = await retrieveRegisteredPlayerByFirebaseUID('test1');
    player2.games = [...player2.games, newGame];
    player2.gameRecords.push({
      textTyped: 'test1',
      wpm: 2,
    });
    await updateRegisteredPlayer(player2);
  }

  newGame.players = [player1, player2];
  await updateGame(newGame);
}

// Start database and server before any tests run
beforeAll(async (done) => {
  mongod = new MongoMemoryServer();

  await mongod.getUri()
    .then((cs) => connectToDatabase(cs));

  app = express();
  app.use(express.json());
  app.use('/match-history',
    router);
  server = app.listen(3000, done);
});

// Populate database with dummy data before each test
beforeEach(async (done) => {
  done();
});

// Clear database after each test
afterEach(async (done) => {
  await Game.deleteMany({});
  await RegisteredPlayer.deleteMany({});
  player1 = null;
  player2 = null;
  done();
});

// Stop db and server before we finish
afterAll(async (done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    done();
  });
});

test('retrieve match history no token', async (done) => {
  try {
    await axios.get('http://localhost:3000/match-history');
  } catch (err) {
    const { response } = err;
    expect(response).toBeDefined();
    expect(response.status).toBe(401);
    expect(response.data.message).toBe('No token provided');
    done();
  }
});

test('retrieve match history Invalid token', async (done) => {
  const accessToken = 'test';
  try {
    await axios.get('http://localhost:3000/match-history', {
      headers: {
        authorization: `Bearer${accessToken}`,
      },
    });
  } catch (err) {
    const { response } = err;
    expect(response).toBeDefined();
    expect(response.status).toBe(401);
    expect(response.data.message).toBe('Invalid token');
    done();
  }
});

test('retrieve match history could not verify', async (done) => {
  const accessToken = 'fail';
  try {
    await axios.get('http://localhost:3000/match-history', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    const { response } = err;
    expect(response).toBeDefined();
    expect(response.status).toBe(403);
    expect(response.data.message).toBe('Could not authorize');
    done();
  }
});

test('retrieve match history no data', async (done) => {
  const accessToken = 'test';
  try {
    await axios.get('http://localhost:3000/match-history', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    const { response } = err;
    expect(response).toBeDefined();
    expect(response.status).toBe(404);
  }
  done();
});

test('retrieve match history 1 game', async (done) => {
  await initData();
  const accessToken = 'test';
  const response = await axios.get('http://localhost:3000/match-history', {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  expect(response).toBeDefined();
  expect(response.data.length).toBe(1);
  expect(response.data[0].wpm).toBe(1);
  expect(response.data[0].place).toBe(2);
  expect(response.data[0].otherPlayers.length).toBe(2);
  done();
});

test('retrieve match history 2 game', async () => {
  await initData();
  await initData();
  const accessToken = 'test';
  const response = await axios.get('http://localhost:3000/match-history', {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  expect(response).toBeDefined();
  expect(response.data.length).toBe(2);
  expect(response.data[0].wpm).toBe(1);
  expect(response.data[0].place).toBe(2);
  expect(response.data[0].otherPlayers.length).toBe(2);
  expect(response.data[1].wpm).toBe(1);
  expect(response.data[1].place).toBe(2);
  expect(response.data[1].otherPlayers.length).toBe(2);
});
