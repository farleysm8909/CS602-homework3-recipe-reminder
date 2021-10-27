import { homepage } from "./homepage.js";
import { retrieveRecipe } from "./retrieve.js";

async function saveRecipe() {
    const url = "http://127.0.0.1:3000/recipe";

    // get value of step inputs -> store into db as one big string
    let totalSteps = "";
    const enteredSteps = document.getElementsByClassName("step-values");
    if (enteredSteps) {
        for (let i = 0; i < enteredSteps.length-1; i++) {
            totalSteps += enteredSteps[i].value + "   ";
        }
        totalSteps += enteredSteps[enteredSteps.length-1].value; // avoids extra "   " at end of last step (causes one extra blank step to appear in recipes)
    }
    
    const data = {
        name:           document.querySelector("#name").value,
        description:    document.querySelector("#description").value,
        steps:          totalSteps
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


// function addStep(nextStepNum) {
//     document.getElementById("more-steps").innerHTML += 
//     `<div class="input-group mb-3">
//         <span class="input-group-text">Step #${nextStepNum} Description</span>
//         <input type="text" class="form-control step-values" id="steps" placeholder="e.g., Next...">
//     </div>`;
// }

function addStep(nextStepNum) {
    document.getElementById("more-steps").innerHTML += 
    `<div class="input-group mb-3">
        <span class="input-group-text">Step #${nextStepNum} Description</span>
        <input type="text" class="form-control step-values" id="steps" placeholder="e.g., Next...">
    </div>`;
}



function addStepToExistingRecipe() {
    let step_entry_fields = document.getElementById("step-entry-fields");
    step_entry_fields.innerHTML = 
    `<div class="input-group mb-3">
        <span class="input-group-text">New Step Description</span>
        <input type="text" class="form-control step-values" id="newsteps" placeholder="e.g., Next...">
    </div>`;
    step_entry_fields.style.display = "block";
    document.getElementById("getStepBtn").style.display = "none";
    document.getElementById("editStep").style.display = "none";
    document.getElementById("findStepBtn").style.display = "none";
    document.getElementById("saveStepBtn").style.display = "inline";
}




async function saveStep() {
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
    let steps = jsonResponse[recIndex].steps[0];

    const url2 = `http://127.0.0.1:3000/recipe/${recipeId}/step`;

    // define step - the value to replace old step
    steps += "   " + document.getElementById("newsteps").value;

    const data = {
        steps:          steps
    };
    
    const config = {
        method: "post", 
        mode: "cors", 
        cache: "no-cache", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };

    const fetchResponse2 = await fetch(url2, config);       
    const jsonResponse2 = await fetchResponse2.json(); 

    document.getElementById("step-entry-fields").style.display = "none";
    document.getElementById("saveStepBtn").style.display = "none";
    retrieveRecipe(recIndex);

}

export { saveRecipe, addStep, addStepToExistingRecipe, saveStep };