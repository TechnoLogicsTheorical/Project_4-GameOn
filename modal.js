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

// Collection des champs nommées dans les inputs
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

const formInputs = document.querySelectorAll('.formData');
const formElem = document.querySelector('form');
/**
 * Variable de validation booléen qui permet à la fin de décider d'afficher ou non le message d'inscription
 */
let validate = true;

/**
 * @function 
 * Function permettant de récuperer l'element HTML ayant la classe formData et de créer les attributs HTML nécessaire pour afficher une erreur grace à la regle CSS : .formData[data-error]::after
 * @param {HTMLElement} element Prend en argument la variable de l'élement HTML
 * @param {string} textValue Prend en chaine de caractère indiquant le message à afficher
 * 
 * @returns {boolean} False Retourne un valeur booléenne false pour le stocker dans la variable de validation du formulaire
 */
function giveErrorAttributes(element, textValue) {
    const enableEroor = document.createAttribute("data-error-visible");
    enableEroor.value = 'true';
    element.attributes.setNamedItem(enableEroor);
    
    const showText = document.createAttribute("data-error");
    showText.value = textValue;
    element.attributes.setNamedItem(showText);

    return false;
}
/**
 * @function 
 *  Contraire de la fonction giveErrorAttributes pour effacer l'erreur en question
 *  @param {HTMLElement} element Prend en argument la variable de l'élement HTML
 */
function deleteAttributes(element) {
    element.removeAttribute("data-error-visible");
    element.removeAttribute("data-error");
}

// A la soumission du formulaire, on récupere les valeurs des champs du Formulaire pour par la suite, s'occuper du traitement de chaque champs selon leurs types
formElem.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(formElem);

    validate = true;

    /**
     *  Objet JSON pour faciliter les differents appels de fonction ou de propriétes nécessaires à etre utiliser
     */
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
        location: {
            value : formData.get(nameDataInputs[5]),
            formElement : formInputs[5]
        },
        acceptedCGU: {
            value : formData.get(nameDataInputs[6]),
            formElement : formInputs[6]
        },
        acceptedNews: {
            value : formData.get(nameDataInputs[7]),
            formElement : formInputs[7]
        },
    }

    //------------------------------------- Check Conditions ----------------------------------------------------------------
    
    const haveNumber = /[0-9]/

    if (inputs.firstname.value == "") {
        validate = giveErrorAttributes(inputs.firstname.formElement, 'Ce champ ne peut être vide !');
    } else if (inputs.firstname.condition() < 2){
        validate = giveErrorAttributes(inputs.firstname.formElement, 'Ce champ nécessite au moins 2 caractères');
    } else if (haveNumber.test(inputs.firstname.value)) { 
        validate = giveErrorAttributes(inputs.firstname.formElement, 'Ce champ ne peut contenir des chiffres');
    } else {
        deleteAttributes(inputs.firstname.formElement);
    }


    if (inputs.lastname.value == "" ) {
        validate = giveErrorAttributes(inputs.lastname.formElement, 'Ce champ ne peut être vide !');
    } else if (inputs.lastname.condition() < 2){
        validate = giveErrorAttributes(inputs.lastname.formElement, 'Ce champ nécessite au moins 2 caractères');
    } else if (haveNumber.test(inputs.lastname.value)) { 
        validate = giveErrorAttributes(inputs.lastname.formElement, 'Ce champ ne peut contenir des chiffres');
    } else {
        deleteAttributes(inputs.lastname.formElement);
    }
    

    const emailRegEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // console.log(emailRegEX.test('aggg@hotmail'))
    if (!emailRegEX.test(inputs.email.value) || inputs.email.value == "") {
        validate = giveErrorAttributes(inputs.email.formElement, 'Veuillez saisir une adresse email correct');
    } else {
        deleteAttributes(inputs.email.formElement);
    }

    let dateYearBirth = new Date(inputs.birthdate.value).getFullYear();
    let dateYearNow = new Date().getFullYear();

    if (inputs.birthdate.value == "") {
        validate = giveErrorAttributes(inputs.birthdate.formElement, 'Ce champ ne peut être vide !');
    } else if ((dateYearBirth - dateYearNow ) > 1) {
        validate = giveErrorAttributes(inputs.birthdate.formElement, 'Vous n\'êtes pas encore né ! :)');
    } else if ((dateYearNow - dateYearBirth) < 8) {
        validate = giveErrorAttributes(inputs.birthdate.formElement, 'Vous n\'avez pas l\'age requis');
    } else if ((dateYearNow - dateYearBirth) > 100) {
        validate = giveErrorAttributes(inputs.birthdate.formElement, 'Votre age ne correspond pas aux critères.');
    } else {
        deleteAttributes(inputs.birthdate.formElement);
    }

    if (inputs.quantity.value == "") {
        validate = giveErrorAttributes(inputs.quantity.formElement, 'Veuillez spécifier un nombre')
    } else if (parseInt(inputs.quantity.value) < 0 || parseInt(inputs.quantity.value) > 99) {
        validate = giveErrorAttributes(inputs.quantity.formElement, 'Entrez une valeur entre 0 et 99')
    } else {
        deleteAttributes(inputs.quantity.formElement);
    }


    if (inputs.location.value == null) {
        validate = giveErrorAttributes(inputs.location.formElement, 'Veuillez sélectionner une ville')
    } else {
        deleteAttributes(inputs.location.formElement);
    }

    if (inputs.acceptedCGU.value == null) {
        validate = giveErrorAttributes(inputs.acceptedCGU.formElement, 'Confirmez la lecture des CGU')
    } else {
        deleteAttributes(inputs.acceptedCGU.formElement);
    }

    /* 
        Une fois la validation effectuées, on va supprimer tous les elements HTML inputs
        PAR la suite, on va ajouter un nouvel element HMTL pour remercie l'utilisateur d'avoir soumis son inscription
        Il faudra aussi RECUPERER l'element Bouton Submit pour Fermer la modal
    */

    // <h1 class=''>Merci pour votre inscription</h1>\n <input class='button btn-submit' type='submit' value='Fermer'
    if (validate) {
        formElem.innerHTML= ""
        formElem.parentNode.classList.add('finaly')
        let thankSubscribe = document.createElement('h1')
        thankSubscribe.classList.add('text-control')
        thankSubscribe.textContent = 'Merci pour votre inscription'

        let newInputButton = document.createElement('input')
        newInputButton.classList.add('button','btn-submit')
        newInputButton.type = 'button'
        newInputButton.value = 'Fermer'

        formElem.appendChild(thankSubscribe)
        formElem.appendChild(newInputButton)

        newInputButton.addEventListener('click', closeModal)
    }
})