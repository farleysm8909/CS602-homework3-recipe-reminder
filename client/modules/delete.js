import { homepage } from "./homepage.js";
import { retrieveRecipe } from "./retrieve.js";

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

    homepage();
}


async function deleteStep() {

    const url = `http://127.0.0.1:3000/recipe`;
    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json();

    // figure out which recipe is being altered
    const recipe_name = document.getElementById("retrieved-recipe").textContent;
    let recIndex;

    for (let i=0; i<jsonResponse.length; i++) {
        if (jsonResponse[i].name === recipe_name) {
            recIndex = i;
        }
    } 

    const recipeId = jsonResponse[recIndex]._id;
    const sId = document.getElementById("stepNum").value;

    const url2 = `http://127.0.0.1:3000/recipe/${recipeId}/step/${sId}`;

    const data = {
        sId:    sId
    }

    const config = {
        method: "delete", 
        mode: "cors", 
        cache: "no-cache", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };

    const fetchResponse2 = await fetch(url2, config); 
    const jsonResponse2 = await fetchResponse2.json(); 

    let step_num_field = document.getElementById("step-num-entry-field");
    step_num_field.innerHTML = ``;
    step_num_field.style.display = "none";

    retrieveRecipe(recIndex);
}


export { deleteRecipe, deleteStep };