/* global Chart */
export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {
      piecesElements[i].addEventListener("click", async function (event) {
           const id = event.target.dataset.id;
   const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
   const avis = await reponse.json();

   
   const pieceElement = event.target.parentElement;

const avisElement = document.createElement("p");
for (let i = 0; i < avis.length; i++) {
   avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
}
  
   pieceElement.appendChild(avisElement);   
   event.target.disabled = true; 


      });
    }
}

export function ajoutListenerEnvoyerAvis() {

   const formulaireAvis = document.querySelector(".formulaire-avis");
   formulaireAvis.addEventListener('submit', async function (event) {
      event.preventDefault();
      console.log("vous avez cliquez sur le bouton");
      const avis = {
         pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
         utilisateur: event.target.querySelector("[name=utilisateur]").value,
         commentaire: event.target.querySelector( "[name=commentaire]").value,
         nbEtoile: parseInt(event.target.querySelector("[name=nbEtoiles]").value),
      };
      const chargeUtile = JSON.stringify(avis);

       fetch("http://localhost:8081/avis", {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: chargeUtile
      });

      

   });
}






export async function afficherGraphiqueAvis(){

// Calcul du nombre total de commentaires par quantité d'étoiles attribuées
const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
const nb_commentaires = [0, 0, 0, 0, 0];
for (let commentaire of avis) {
  nb_commentaires[commentaire.nbEtoiles - 1]++;
}
// Légende qui s'affichera sur la gauche à côté de la barre horizontale
const labels = ["5", "4", "3", "2", "1"];

// Données et personnalisation du graphique
const data = {
   labels: labels,
   datasets: [{
    label: "Étoiles attribuées",
    data: nb_commentaires.reverse(),
     backgroundColor: "rgba(255, 230, 0, 1)", // couleur jaune
   }],
};

// Objet de configuration final
const config = {
   type: "bar",
   data: data,
   options: {
      indexAxis: "y",
   },
};


// Rendu du graphique dans l'élément canvas
new Chart(
   document.querySelector("#graphique-avis"),
   config,
);
}


window.addEventListener("load", async function () {
   const piecesJSON = window.localStorage.getItem("pieces");
const pieces = JSON.parse(piecesJSON);
let nbCommentaireDispo = 0;
let nbCommentaireNonDispo = 0;

for(let i = 0; i<pieces.length; i++)
{
   if(pieces[i].disponibilite)
   {
      nbCommentaireDispo++;
   }
   else
   {
      nbCommentaireNonDispo++;
   }
}

const labelDispo = ["disponible", "non-dispo"];

const data = {
   labels: labelDispo,
   datasets: [{
    label: "Nombre de commentaire",
    data: [nbCommentaireDispo, nbCommentaireNonDispo],
     backgroundColor: "rgba(0, 230, 255, 1)",
   }],
};


// Objet de configuration final
const config = {
   type: "bar",
   data: data,
};

new Chart(
   document.querySelector("#graphique-dispo"),
   config,
);
});