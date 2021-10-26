import {deleteRecipe} from "./delete.js";

async function homepage() {
    const url = "http://127.0.0.1:3000/recipe";

    const fetchResponse = await fetch(url);           // calls "get" to grab all recipes (see recipe routes)
    const jsonResponse = await fetchResponse.json();  // converts json data to javascript objects

    document.getElementById("homepage-response").innerHTML = "";

    jsonResponse.forEach(recipe => {
        let count = 1;
        let name = `<h4>`;
        let desc = `<p>`;
        let _id = `<p>`;
        name += `${recipe.name}</h4>`; 
        desc += `${recipe.description}</p>`;
        _id += `${recipe._id}</p>`;
        document.getElementById("homepage-response").innerHTML += 
        `<div class="recipe-cards" recipeId=${count}>${name}<span class="delBtn">&times;</span><br><span id="recId">${_id}</span><br>${desc}</div>`;
        count++;
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
}

export { homepage };