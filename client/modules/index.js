import { saveRecipe, addStepToExistingRecipe, saveStep, addStep } from "./create.js";
import { homepage } from "./homepage.js";
import { displayStepNumField, retrieveStep } from "./retrieve.js";
import { editStep, displayEditStep } from "./update.js";

window.addEventListener('DOMContentLoaded', () => {
    const create_page = document.getElementById("create-recipe");
    create_page.style.display = "none";
    homepage();

    // create recipe btn
    const createbtn = document.querySelector("#createBtn");
    if ( createbtn ) {
        createbtn.addEventListener("click", () => {
            document.getElementById("homepage").style.display = "none";
            create_page.style.display = "block";
        });
    } else {
        console.error(`Unable to bind to create button! Debug Required.`);
    }

    // save recipe btn
    const savebtn = document.querySelector("#saveBtn");
    if ( savebtn ) {
        savebtn.addEventListener("click", () => {
            saveRecipe();
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }

    // cancel save btn
    const cancelbtn = document.querySelector("#cancelBtn");
    if ( cancelbtn ) {
        cancelbtn.addEventListener("click", () => {
            document.getElementById("create-recipe").style.display = "none";
            homepage();
            document.getElementById("homepage").style.display = "block";
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    } 


    // create new step btn (during recipe creation only)
    const addStepBtn = document.getElementById("stepBtn");
    let nextStepNum = 2;
    addStepBtn.addEventListener("click", () => {
        addStep(nextStepNum);
        nextStepNum++;
    });

    // create new step btn (while examining one recipe)
    const addOneStepBtn = document.getElementById("addStep");
    addOneStepBtn.addEventListener("click", () => {
        addStepToExistingRecipe();
    });

    // save new step btn
    const savestepbtn = document.querySelector("#saveStepBtn");
    if ( savestepbtn ) {
        savestepbtn.addEventListener("click", () => {
            saveStep();
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }
    
    // edit step btn - update UI
    const editStepBtn = document.getElementById("editStep");
    editStepBtn.addEventListener("click", () => {
        displayEditStep();
    });

    // edit step btn - initiates update to db
    const saveEditBtn = document.getElementById("saveEditBtn");
    saveEditBtn.addEventListener("click", () => {
        editStep();
    });

    // find step btn - updates UI to prepare for db retrieval
    const findStepBtn = document.getElementById("findStepBtn");
    findStepBtn.addEventListener("click", () => {
        displayStepNumField();
    });


    // get step btn - initiates retrieval from db
    const getStepBtn = document.getElementById("getStepBtn");
    getStepBtn.addEventListener("click", () => {
        retrieveStep();
    });


    // cancel update step btn
    const cancelUpdateBtn = document.getElementById("cancelUpdateBtn");
    cancelUpdateBtn.addEventListener("click", () => {
        homepage();
    });

});