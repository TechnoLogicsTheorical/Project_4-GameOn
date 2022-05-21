function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");

// Sélection du button sans rajout et avec une précision / spécifité haute
const modalCloseBtn = document.querySelector(".bground .content span.close");

function closeModal() {
  modalbg.style.display = "none";
}
modalCloseBtn.addEventListener('click', closeModal, false);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

/*
    LORSQUE l'on clique sur le bouton d'envoie du form
        ON stop l'envoie des données et procédons au traitement de ces dernieres.
        ON RECUPERE la valeur de chaque elements inputs

          
    let formElement = document.forms['reserve'];
    
    for(dataName of formData) {
        formElement[dataName].value
        console.log(this)
    }
*/

//function validate() {
    //Evenement inutile gréffée sur l'attribut de onsubmit="return validate();">
//}

const nameDataInputs = [
    'first',
    'last',
    'email',
    'birthdate',
    'quantity',
    'location',
    'acceptedCGU',
    'acceptedNews'
]

const formInputs = document.querySelectorAll('.formData')
const formElem = document.querySelector('form');

function giveErrorAttributes(element, textValue) {
    const enableEroor = document.createAttribute("data-error-visible")
    enableEroor.value = 'true';
    element.attributes.setNamedItem(enableEroor);
    
    const showText = document.createAttribute("data-error")
    showText.value = textValue;
    element.attributes.setNamedItem(showText);
}

function deleteAttributes(element) {
    element.removeAttribute("data-error-visible")
}


formElem.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElem);
    let inputs = {
        firstname: {
            value : formData.get(nameDataInputs[0]),
            formElement : formInputs[0],
            condition : function() {
                return new String(this.value).length
            }
        },
        lastname: {
            value : formData.get(nameDataInputs[1]),
            formElement : formInputs[1],
            condition : function() {
                return new String(this.value).length
            }
        },
        email: {
            value : formData.get(nameDataInputs[2]),
            formElement : formInputs[2]
        },
        birthdate: {
            value : formData.get(nameDataInputs[3]),
            formElement : formInputs[3]
        },
        quantity: {
            value : formData.get(nameDataInputs[4]),
            formElement : formInputs[4]
        },
        acceptedCGU: {
            value : formData.get(nameDataInputs[5]),
            formElement : formInputs[5]
        },
        acceptedNews: {
            value : formData.get(nameDataInputs[6]),
            formElement : formInputs[6]
        },
    }

    //------------------------------------- Check Conditions ----------------------------------------------------------------
    if (inputs.firstname.value == "" ) {
        giveErrorAttributes(inputs.firstname.formElement, 'Ce champ ne peut être vide !')
    } else if (inputs.firstname.condition() < 2){
        giveErrorAttributes(inputs.firstname.formElement, 'Ce champ nécessite au moins 2 caractères')
    } else {
        deleteAttributes(inputs.firstname.formElement)
    }


    if (inputs.lastname.value == "" ) {
        giveErrorAttributes(inputs.lastname.formElement, 'Ce champ ne peut être vide !')
    } else if (inputs.lastname.condition() < 2){
        giveErrorAttributes(inputs.firstname.formElement, 'Ce champ nécessite au moins 2 caractères')
    } else {
        deleteAttributes(inputs.lastname.formElement)
    }
    
    
    let emailRegEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailRegEX.test(inputs.email.value) || inputs.email.value == "") {
        giveErrorAttributes(inputs.email.formElement, 'Veuillez saisir une adresse email correct')
    } else {
        deleteAttributes(inputs.email.formElement)
    }
})