import { homepage } from "./homepage.js";
import { deleteRecipe } from "./delete.js";

async function retrieveRecipe(recIndex) {

    const url = `http://127.0.0.1:3000/recipe`;
    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json();
    
    const recipeId = jsonResponse[recIndex]._id;

    const url2 = `http://127.0.0.1:3000/recipe/${recipeId}`;

    const fetchResponse2 = await fetch(url2);            // fetch single recipe
    const jsonResponse2 = await fetchResponse2.json(); 

    const name = jsonResponse2.name;
    const desc = jsonResponse2.description;
    const recipe_string = jsonResponse2.steps;
    // break up string into individual steps
    let steps_array = recipe_string[0].split("   ");
    let steps = `<ol>`;
    steps_array.forEach(step => {
        steps += `<li>${step}</li>`;
    });
    steps += `</ol>`;
    
    document.getElementById("homepage-response").innerHTML = 
    `<div class="recipe-cards"><h4 id="retrieved-recipe">${name}</h4>${desc}${steps}</div>`;

    document.getElementById("createBtn").style.display = "none";
    document.getElementById("addStep").style.display = "inline";
    document.getElementById("editStep").style.display = "inline";
    document.getElementById("cancelUpdateBtn").style.display = "inline";

}


export { retrieveRecipe };