
const prenom = localStorage.getItem('prenom')
const nom = localStorage.getItem('nom')
const clients = localStorage.getItem('clients')
const annonces = localStorage.getItem('annonces')
console.log(clients)

document.getElementById("name").textContent = prenom
document.getElementById("nbClients").textContent = clients.length
document.getElementById("nbAnnonces").textContent = annonces.length
