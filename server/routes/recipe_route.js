import express from "express";
import { isProduction } from "../utils/common.js";
import { Recipe } from "../models/Recipe.js";

const router = express.Router();

/* ************************* GET ************************* */

// get all recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.send(recipes);
    } catch(err) {
        res.status(404).send({error: "Recipes not found!"});
    }
});


// get recipe by id
router.get("/:_id", async (req, res) => { 
    try {
        const recipe = await Recipe.findOne({_id: req.params._id}); // https://rahmanfadhil.com/express-rest-api/
        res.send(recipe);
    } catch(err) {
        res.status(404).send({error: "Recipe not found!"});
    }
});


// get recipe step by id
router.get("/:_id/step/:sId", async (req, res) => { 
    try {
        const recipe = await Recipe.findOne({_id: req.params._id}); // https://rahmanfadhil.com/express-rest-api/
        const step = recipe.steps[req.params.sId-1]; // subtract one since users will type 1, 2... instead of 0, 1...
        res.send(step);
    } catch(err) {
        res.status(404).send({error: "Recipe not found!"});
    }
});




/* ************************* CREATE ************************* */


// create a new recipe
router.post("/", async (req, res) => { 
    // validate request
    if (!req.body.name || !req.body.description) {
        return res.status(400).send({error: "Name and description fields cannot be empty"});
    }
    const data = {
        name:           req.body.name,
        description:    req.body.description,
        steps:          req.body.steps
    };
    
    const recipe = new Recipe(data);

    try {
        const savedRecipe = await recipe.save();
        res.status(200).json(JSON.stringify(savedRecipe)); 
    } catch(err) {
        if (isProduction()) {
            console.error(err);
        }
        res.status(500).json({error: "Recipe not saved."}); 
    }
});


/* ************************* DELETE ************************* */


// delete recipe with a specific id
router.delete("/:_id", async (req, res) => { 
    try {
        const deletedrecipe = await Recipe.deleteOne({_id: req.params._id}); // https://rahmanfadhil.com/express-rest-api/

        console.log(`deleted! Number of docs deleted: ${deletedrecipe.deletedCount}`);
        res.status(204).json({message: "Hooray!"});
    } catch(err) {
        res.status(404).json({error: "Recipe doesn't exist!"});
    }
});

export {router as recipeRoutes};
