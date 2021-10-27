import { retrieveRecipe } from "./retrieve.js";

function displayEditStep() {
    let step_num_field = document.getElementById("step-num-entry-field");
    step_num_field.innerHTML = 
    `<div class="input-group mb-3">
        <span class="input-group-text">Step Number to Update</span>
        <input type="text" class="form-control step-values" id="stepNum" placeholder="e.g., 2">
    </div>`;
    let step_entry_fields = document.getElementById("step-entry-fields");
    step_entry_fields.innerHTML = 
    `<div class="input-group mb-3">
        <span class="input-group-text">New Step Description</span>
        <input type="text" class="form-control step-values" id="updatedStepDescription" placeholder="e.g., Next...">
    </div>`;
    step_entry_fields.style.display = "block";
    step_num_field.style.display = "block";
    document.getElementById("getStepBtn").style.display = "none";
    document.getElementById("addStep").style.display = "none";
    document.getElementById("editStep").style.display = "none";
    document.getElementById("saveEditBtn").style.display = "inline";   
    document.getElementById("findStepBtn").style.display = "none";
}

async function editStep() {
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
    const newStep = document.getElementById("updatedStepDescription").value;
    
    const url2 = `http://127.0.0.1:3000/recipe/${recipeId}/step/${sId}`;

    const data = {
        updatedStep:    newStep
    }

    const config = {
        method: "put",
        mode: "cors", 
        cache: "no-cache", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }
    
    const fetchResponse2 = await fetch(url2, config); 
    const jsonResponse2 = await fetchResponse2.json(); 
    
    let step_num_field = document.getElementById("step-num-entry-field");
    step_num_field.innerHTML = ``;
    let step_entry_fields = document.getElementById("step-entry-fields");
    step_entry_fields.innerHTML = ``;
    step_entry_fields.style.display = "none";
    step_num_field.style.display = "none";

    retrieveRecipe(recIndex);

}

export { displayEditStep, editStep };
