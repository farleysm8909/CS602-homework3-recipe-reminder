import { readFile } from 'fs/promises';
import mongoose from "mongoose";

const dbConfig = JSON.parse(await readFile(new URL('../config/mongo_config.json', 
                                                   import.meta.url)));

const connection = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`;
mongoose.connect(connection);

// create schema then model

const Schema = mongoose.Schema;

// const Step = new Schema({
//     num:            {type: Number},
//     description:    {type: String}
// });

// const StepModel = mongoose.model("StepModel", Step);

const Recipe = new Schema({
    name:         {type: String},
    description:  {type: String},
    steps:        {type: [String]}
});

const RecipeModel = mongoose.model("RecipeModel", Recipe);

// const Step = mongoose.model("Step", new mongoose.Schema({ // should this go here or in a separate Step.js model?
//     num:            {type: Number},
//     description:    {type: String}
// }));

// const Recipe = mongoose.model("Recipe", new mongoose.Schema({
//     name:         {type: String},
//     description:  {type: String},
//     steps:        [{type: Step}] // array of subdocuments https://mongoosejs.com/docs/guide.html
// }));

// export { StepModel as Step, RecipeModel as Recipe }
export { RecipeModel as Recipe };