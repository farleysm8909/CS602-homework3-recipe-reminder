import express from "express";
import cors from "cors";
import { recipeRoutes } from "./routes/recipe_route.js";


const app = express();
const port = process.env.PORT || 3000; //listen here for incoming requests

app.use(express.json()); //fill-in for body-parser (deprecated)
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use("/recipe", recipeRoutes); // send all requests with '/recipe' in URL to the recipeRoutes router (handler)

app.listen(port, () => {
    console.info(`Application Started.  Port: ${port}`);
});