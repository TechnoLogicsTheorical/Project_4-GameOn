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
const formData = document.querySelectorAll(".formData");

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


