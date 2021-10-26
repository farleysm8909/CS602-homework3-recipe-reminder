import { homepage } from "./homepage.js";

async function deleteRecipe(recIndex) {

    const url = `http://127.0.0.1:3000/recipe`;
    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json();
    
    const recipeId = jsonResponse[recIndex]._id;

    const url2 = `http://127.0.0.1:3000/recipe/${recipeId}`;
    
    const config = {
        method: "delete", 
        body: null
    };

    const fetchResponse2 = await fetch(url2, config);   // initiate delete recipe from db
    //const jsonResponse2 = await fetchResponse2.json(); // get unexpected end of json input error?

    homepage();
}


export { deleteRecipe };