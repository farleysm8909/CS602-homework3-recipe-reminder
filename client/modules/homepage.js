import { deleteRecipe } from "./delete.js";
import { retrieveRecipe } from "./retrieve.js";

async function homepage() {
    const url = "http://127.0.0.1:3000/recipe";

    const fetchResponse = await fetch(url);           // calls "get" to grab all recipes (see recipe routes)
    const jsonResponse = await fetchResponse.json();  // converts json data to javascript objects

    document.getElementById("homepage-response").innerHTML = "";
    document.getElementById("step-entry-fields").style.display = "none";
    document.getElementById("step-num-entry-field").style.display = "none";

    jsonResponse.forEach(recipe => {
        let name = `<h4 class="recNames">${recipe.name}</h4>`;
        let desc = `<p>${recipe.description}</p>`;
        let recipe_string = recipe.steps;
        // break up string into individual steps
        let steps_array = recipe_string[0].split("   ");
        let steps = `<ol>`;
        steps_array.forEach(step => {
            steps += `<li>${step}</li>`;
        });
        steps += `</ol>`;
    
        document.getElementById("homepage-response").innerHTML += 
        `<div class="recipe-cards">${name}<span class="delBtn">&times;</span><br>${desc}${steps}</div>`;
    });

    // delete recipe, put this here (as opposed to index.js) in order for event listeners to attach at appropriate time
    const deletebtns = document.getElementsByClassName("delBtn");
    if (deletebtns) {
        for (let i=0; i<deletebtns.length; i++) {
            deletebtns[i].addEventListener("click", () => {
                deleteRecipe(i);
            });
        }
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }

    const recipeCards = document.getElementsByClassName("recNames");
    if (recipeCards) {
        for (let i=0; i<recipeCards.length; i++) {
            recipeCards[i].addEventListener("click", () => {
                retrieveRecipe(i);
            });
        }
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }

}

export { homepage };