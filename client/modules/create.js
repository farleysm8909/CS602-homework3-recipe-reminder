import { homepage } from "./homepage.js";

async function saveRecipe() {
    const url = "http://127.0.0.1:3000/recipe";

    const data = {
        name:           document.querySelector("#name").value,
        description:    document.querySelector("#description").value,
        steps:          document.querySelector("#steps").value
    };
    
    const config = {
        method: "post", 
        mode: "cors", 
        cache: "no-cache", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };

    const fetchResponse = await fetch(url, config);
    const jsonResponse = await fetchResponse.json(); // converts data to javascript objects

    // document.getElementById("recipe4").innerHTML = jsonResponse.description;
// button for add step
// create attributes to keep track of recipes, no global vars recipeId = objectID, stepId = objectId, objectId from json repsonse object
// variable interpolation to populate html attributes: using jQuery, it's $(`step = ${id}`)
// get rid of steps, then add later once working

    document.getElementById("create-recipe").style.display = "none";
    homepage();
    document.getElementById("homepage").style.display = "block";
}

export { saveRecipe };