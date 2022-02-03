/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import { createGame, updateGame } from '../../../mongo/dao/gamesDao';
import { createRegisteredPlayer } from '../../../mongo/dao/registeredPlayersDao';
import { RegisteredPlayer } from '../../../mongo/models/registeredPlayers';
import { Game } from '../../../mongo/models/games';
import router from '../leaderboard';

let mongod;
let app;
let server;
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

async function initData() {
  const newGame = await createGame({
    players: [],
  });

  const player1 = await createRegisteredPlayer({
    name: 'test',
    games: [newGame],
    gameRecords: [{
      textTyped: 'test',
      wpm: 1,
    }],
  });

  const player2 = await createRegisteredPlayer({
    name: 'test1',
    games: [newGame, newGame],
    gameRecords: [{
      textTyped: 'test1',
      wpm: 2,
    }, {
      textTyped: 'test1',
      wpm: 2,
    }],
  });

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
  app.use('/leaderboard',
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

jest.setTimeout(60000);

test('retrieve leaderboard', async () => {
  await initData();
  const response = await axios.get('http://localhost:3000/leaderboard');
  expect(response).toBeDefined();
  expect(response.data.length).toBe(2);
  expect(response.data[0].name).toBe('test1');
  expect(response.data[1].name).toBe('test');
});
