const apiEndpoint = 'http://127.0.0.1:8000/api/'
const prenom = localStorage.getItem('prenom')
const nom = localStorage.getItem('nom')
const clients = localStorage.getItem('clients')
const annonces = localStorage.getItem('submission')
const id = localStorage.getItem('id')
console.log(id)

fetch(`${apiEndpoint}admins/${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return response.json(); // Convertir la réponse en JSON
  })
  .then(adminData => {
    // Une fois que les données sont disponibles
    const nbClients = adminData.clients.length;
    const nbSubmissions = adminData.submissions.length;

    // Mettre à jour votre interface utilisateur avec les données
    document.getElementById("name").textContent = prenom;
    document.getElementById("nbClients").textContent = nbClients;
    document.getElementById("nbAnnonces").textContent = nbSubmissions;
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error);
    // Gérer les erreurs si nécessaire
  });


function addSubmission() {
  // Récupérer les données du formulaire
  const formData = {
    'title': document.getElementById('title').value,
    'surface': document.getElementById('surface').value,
    'price': document.getElementById('price').value,
    'location': document.getElementById('location').value,
    'admin': `${apiEndpoint}admins/${id}`
  };

  console.log(JSON.stringify(formData));

  // Effectuer la requête POST à l'API
  fetch('http://127.0.0.1:8000/api/submissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Réponse de l\'API :', data);
    // Ajoutez ici le code pour gérer la réponse de l'API si nécessaire
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error);
    // Ajoutez ici le code pour gérer les erreurs si nécessaire
  });
}

