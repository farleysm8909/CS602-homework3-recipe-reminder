import express from "express";
import { isProduction } from "../utils/common.js";
import { Recipe } from "../model/Recipe.js";

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
        const sId = Number(req.params.sId);
        const steps_string = recipe.steps[0];
        // break up string into individual steps
        const steps_array = steps_string.split("   ");
        const step = steps_array[sId-1]; // subtract one since users will type 1, 2... instead of 0, 1...
        res.status(200).json(JSON.stringify(step));
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

// create a new recipe step
router.post("/:_id/step", async (req, res) => { 
    // validate request
    if (!req.body.steps) {
        return res.status(400).send({error: "Step field cannot be empty"});
    }

    try {
        let recipe = await Recipe.findById(req.params._id);
        recipe.steps = req.body.steps;
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

        res.status(204).json({message: "Recipe deleted!"});
    } catch(err) {
        res.status(404).json({error: "Recipe doesn't exist!"});
    }
});


// delete step with a specific id
router.delete("/:_id/step/:sId", async (req, res) => { 
    // validate request
    if (!req.body.sId) {
        return res.status(400).send({error: "Step field cannot be empty"});
    }

    try {
        let recipe = await Recipe.findById(req.params._id);
        const sId = Number(req.params.sId);
        let steps_string = recipe.steps[0];
        // break up string into individual steps
        const steps_array = steps_string.split("   ");
        steps_array.splice(sId-1, 1);

        steps_string = "";
        for (let i=0; i<steps_array.length-1; i++) {
            steps_string += steps_array[i] + "   ";
        }
        steps_string += steps_array[steps_array.length-1];

        recipe.steps = [steps_string];
        const savedRecipe = await recipe.save();
        res.status(200).json(JSON.stringify(savedRecipe));

    } catch(err) {
        res.status(404).json({error: "Recipe doesn't exist!"});
    }
});



/* ************************* UPDATE ************************* */

// update step with step id
router.put("/:_id/step/:sId", async (req, res) => {
    // validate request
    if (!req.body.updatedStep) {
        return res.status(400).send({error: "Step field cannot be empty"});
    }

    try {
        let recipe = await Recipe.findById(req.params._id);
        const sId = Number(req.params.sId);
        let steps_string = recipe.steps[0];
        // break up string into individual steps
        const steps_array = steps_string.split("   ");
        steps_array[sId-1] = req.body.updatedStep; // subtract one since users will type 1, 2... instead of 0, 1...
        steps_string = "";
        for (let i=0; i<steps_array.length-1; i++) {
            steps_string += steps_array[i] + "   ";
        }
        steps_string += steps_array[steps_array.length-1];

        recipe.steps = [steps_string];
        const savedRecipe = await recipe.save();
        res.status(200).json(JSON.stringify(savedRecipe));

    } catch(err) {
        res.status(404).json({error: "Unable to update step"});
    }
});



export {router as recipeRoutes};