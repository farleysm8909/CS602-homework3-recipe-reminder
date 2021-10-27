import { saveRecipe, addStep, addStepToExistingRecipe, saveStep } from "./create.js";
import { homepage } from "./homepage.js";
// import { editStep } from "./update.js";

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
    const addStep = document.getElementById("addStep");
    addStep.addEventListener("click", () => {
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
    
    // edit step btn
    const editStepBtn = document.getElementById("editStep");
    editStepBtn.addEventListener("click", () => {
        //editStep();
    });


    // cancel update step btn
    const cancelUpdateBtn = document.getElementById("cancelUpdateBtn");
    cancelUpdateBtn.addEventListener("click", () => {
        document.getElementById("createBtn").style.display = "inline";
        document.getElementById("addStep").style.display = "none";
        document.getElementById("editStep").style.display = "none";
        document.getElementById("saveStepBtn").style.display = "none";
        document.getElementById("cancelUpdateBtn").style.display = "none";

        homepage();
    });

});