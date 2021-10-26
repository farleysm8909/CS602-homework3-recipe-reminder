import { saveRecipe } from "./create.js";
import { homepage } from "./homepage.js";

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
    
    // update step btn
    const updateBtn = document.getElementById("updateStep");
    updateBtn.addEventListener("click", () => {
        // update step
    });


    // cancel update step btn
    const cancelUpdateBtn = document.getElementById("cancelUpdateBtn");
    cancelUpdateBtn.addEventListener("click", () => {
        document.getElementById("createBtn").style.display = "inline";
        document.getElementById("updateStep").style.display = "none";
        document.getElementById("cancelUpdateBtn").style.display = "none";
        
        homepage();
    });

});