import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherGraphiqueAvis } from "./avis.js";

   
//Récupération des pièces eventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem('pieces');
if (pieces === null){
   // Récupération des pièces depuis l'API
   const reponse = await fetch('http://localhost:8081/pieces/');
   pieces = await reponse.json();
   // Transformation des pièces en JSON
   const valeurPieces = JSON.stringify(pieces);
   // Stockage des informations dans le localStorage
   window.localStorage.setItem("pieces", valeurPieces);
}else{
   pieces = JSON.parse(pieces);
}


ajoutListenerEnvoyerAvis();


function genererPiece(pieces)
{
   let fiches = document.querySelector(".fiches");
   fiches.innerHTML = "";

   for(let i = 0; i < pieces.length; i++)
{
const article = pieces[i];
const imageElement = document.createElement("img");
imageElement.src = article.image;
const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;
const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} $  ${article.prix < 35 ? "$" : "$$$"}`;
const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie?? "(aucune categorie)";
const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description??"(aucune description disponible)";
const disponibiliteElement = document.createElement("p");
disponibiliteElement.innerText = `(${article.disponibilite ? "En stock" : "Rupture de stock"} )`;
const sectionFiches = document.querySelector(".fiches");
const pieceElement = document.createElement("article");

const avisBouton = document.createElement("button");
avisBouton.dataset.id = article.id;
avisBouton.textContent = "Afficher les avis";

sectionFiches.appendChild(pieceElement);
pieceElement.appendChild(imageElement);
pieceElement.appendChild(nomElement);
pieceElement.appendChild(prixElement);
pieceElement.appendChild(categorieElement);
pieceElement.appendChild(descriptionElement);
pieceElement.appendChild(disponibiliteElement); 
pieceElement.appendChild(avisBouton);

}
ajoutListenersAvis();



}





genererPiece(pieces);

const triParOrdreCroissant = document.querySelector(".btn-trier-decroissant");
triParOrdreCroissant.addEventListener("click", ()=>{
   const piecesTrierParOrdreDecroissant = pieces.sort(function(a, b){
      return b.prix - a.prix;
   });
   genererPiece(piecesTrierParOrdreDecroissant);
});



const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", ()=>{
   const piecesOrdonnees = Array.from(pieces);
   piecesOrdonnees.sort(function (a, b) {
      return a.prix - b.prix;
   });
   genererPiece(piecesOrdonnees);
   });
   

   const boutonFiltrer = document.querySelector(".btn-filtrer");
   boutonFiltrer.addEventListener("click", ()=>{
      const piecesFiltrees = pieces.filter(function(piece){
         return piece.prix <= 35;
      });
      genererPiece(piecesFiltrees);
   });


   const boutonFiltrerParDescription = document.querySelector(".btn-filtrer-par-descrption");
   boutonFiltrerParDescription.addEventListener("click", ()=>{
      const piecesFiltreesParDescription = pieces.filter(function(piece){
         return piece.description;
      });
      genererPiece(piecesFiltreesParDescription);
   });



    const boutonIntervalle = document.querySelector(".filtres input");
   boutonIntervalle.addEventListener("input", (event)=>{
    const aAfficher = pieces.filter(function(piece){
     return piece.prix <= event.target.value;
   });
      genererPiece(aAfficher);
   });


   const boutonMettreAJour = document.querySelector(".btn-mettre-a-jour");
   boutonMettreAJour.addEventListener("click", ()=>{
      window.localStorage.removeItem("pieces");
      
      });


       await afficherGraphiqueAvis();