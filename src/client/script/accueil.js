// Fonction pour récupérer les données utilisateur
function fetchUserData(apiEndpoint, token, userEmail) {
  return fetch(`${apiEndpoint}/api/users/email/${userEmail}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
    }
    return response.json()
  });
}

// Fonction pour récupérer les soumissions associées à l'utilisateur
function fetchUserSubmissions(apiEndpoint, token, userId) {
  return fetch(`${apiEndpoint}/api/submissions`, {
    method: 'GET',
    headers: {
      'accept': 'application/ld+json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
    }
    return response.json()
  });
}

// Fonction pour afficher les soumissions dans le DOM
function displaySubmissions(submissions) {
  submissions.forEach(submission => {
    const newSubmission = document.createElement('app-submission');
    const submissionContainer = document.createElement('div');
    
    submissionContainer.className = 'xs:mr-auto xs:ml-auto xl:mr-4 mt-4'
    newSubmission.setAttribute('title', submission.title);
    newSubmission.setAttribute('price', submission.price);
    newSubmission.setAttribute('location', submission.location);
    newSubmission.setAttribute('surface', submission.surface);
    newSubmission.setAttribute('image', submission.image_path);
    newSubmission.setAttribute('id', submission.id);
    submissionContainer.appendChild(newSubmission);
    document.getElementById('submissions-container').appendChild(submissionContainer);
  })
  // Logique pour afficher les soumissions dans le DOM
}

// Code principal pour récupérer les données utilisateur et afficher les soumissions
const apiEndpoint = 'http://127.0.0.1:8000';
const token = localStorage.getItem('jwt-token');
const userEmail = localStorage.getItem('email');

fetchUserData(apiEndpoint, token, userEmail)
  .then(userData => {
    localStorage.setItem('userId', userData.id);
    localStorage.setItem('role', userData.roles[0]);
    document.getElementById('name').textContent = userData.firstname;
    return fetchUserSubmissions(apiEndpoint, token, userData.id);
  })
  .then(userSubmissions => {
    const submissionClient = userSubmissions['hydra:member'].filter(submission => {
      return submission.clients && submission.clients.length > 0 && submission.clients[0] === `/api/users/${localStorage.getItem('userId')}`;
    });
    document.getElementById('main-nbAnnonces').textContent = submissionClient.length;
    displaySubmissions(submissionClient);
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error);
  });
