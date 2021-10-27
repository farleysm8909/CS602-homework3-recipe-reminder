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
    document.getElementById("saveEditBtn").style.display = "none";
    document.getElementById("addStep").style.display = "inline";
    document.getElementById("editStep").style.display = "inline";
    document.getElementById("findStepBtn").style.display = "inline";
    document.getElementById("cancelUpdateBtn").style.display = "inline";

}



function displayStepNumField() {
    let step_num_field = document.getElementById("step-num-entry-field");
    step_num_field.innerHTML = 
    `<div class="input-group mb-3">
        <span class="input-group-text">Step Number to Retrieve</span>
        <input type="text" class="form-control step-values" id="stepNum" placeholder="e.g., 2">
    </div>`;
    step_num_field.style.display = "block";
    document.getElementById("getStepBtn").style.display = "inline";
    document.getElementById("addStep").style.display = "none";
    document.getElementById("editStep").style.display = "none";
    document.getElementById("findStepBtn").style.display = "none";
}



async function retrieveStep() {
    const url = `http://127.0.0.1:3000/recipe`;
    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json();

    // figure out which recipe is being added to
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

    const fetchResponse2 = await fetch(url2); 
    const jsonResponse2 = await fetchResponse2.json(); 
    const step = jsonResponse2.slice(1, -1); // remove quotation marks around step

    document.getElementById("homepage-response").innerHTML = 
    `<div class="recipe-cards"><p>Step Number ${sId}: ${step}</p></div>`;

    //document.getElementById("step-num-entry-field").style.display = "none";
}


export { retrieveRecipe, displayStepNumField, retrieveStep };