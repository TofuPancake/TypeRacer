/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const axios = require('axios');
const splitter = require('sbd');
const {Prose} = require('./mongo/prose.js');
const textUris = require('./textConfig.js').modules;
require('dotenv').config();

const mongoUri = process.env.ATLAS_URI;

/**
 * Clears the database of prose
 */
async function clearProseDatabase() {
  const proseDeleted = await Prose.deleteMany({});
  console.log(`Cleared database (removed ${proseDeleted.deletedCount} prose).`);
}

async function insertProse() {
  let count = 0;
  for( let textUri of textUris ) {
    console.log(textUri)
    const response = await axios.get(textUri);
      response.data = response.data
      .replace(/(\r\n|\n|\r)/gm, '') // removes newlines
      .replace(/[\u2018\u2019]/g, "'") // removes curly single quotes
      .replace(/[\u201C\u201D]/g, '"') // removes curly double quotes
      .replace(/[\u00A1-\u25FF]/g, ''); //removes all other special characters


      // prose is split into sentences using library `sentence Boundary Decision` SBD
      let splitText = splitter.sentences(response.data, {});
      splitText = splitText.filter( e => e.match("[a-zA-Z]+"))
      const dbModel = new Prose({
        _id: count,
        link: textUri,
        sentences: splitText,
      });

      count += 1;
      await dbModel.save();
      console.log(`Prose saved! _id = ${dbModel._id}`);
  }
}

async function main() {
  await mongoose.connect(
    mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        throw err;
      } else {
        console.log('Successfully connected to MongoDB Atlas.');
      }
    },
  );

  await clearProseDatabase();
  await insertProse();

  process.exit();
}

main();


