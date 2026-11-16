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