const apiEndpoint = 'http://127.0.0.1:8000';
const urlParams = new URLSearchParams(window.location.search);
const submissionId = urlParams.get('id');
const role = localStorage.getItem('role');
const token = localStorage.getItem('token')

if (role == "ROLE_CLIENT") {
  document.getElementById("edit-submission-button").className = 'hidden';
}

const fetchSubmissionData = async () => {
  try {
    const response = await fetch(`${apiEndpoint}/api/submissions/${submissionId}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    const submissionData = await response.json();

    // Mise à jour de l'interface utilisateur avec les données de soumission récupérées
    document.getElementById('submission-title').textContent = submissionData.title;
    document.getElementById('submission-location').textContent = submissionData.location;
    document.getElementById('submission-surface').textContent = submissionData.surface;
    document.getElementById('submission-price').textContent = `${submissionData.price} €`;
    document.getElementById('submission-description').textContent = submissionData.description;
    if (submissionData.image_path) {
      document.getElementById('submission-image').src = submissionData.image_path;
    }

    // Récupération des coordonnées géographiques et affichage sur la carte
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(submissionData.location)}&format=json&limit=1`;
    const responseCoords = await fetch(url);
    if (!responseCoords.ok) {
      throw new Error('Erreur de réseau');
    }
    const data = await responseCoords.json();
    const latitude = data[0].lat;
    const longitude = data[0].lon;
    var map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var circle = L.circle([latitude, longitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 400
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
      .bindPopup(submissionData.title)
      .openPopup();

    const client_apiEndpoint = '127.0.0.1:8000'
    const response_client = await fetch(`${apiEndpoint}${submissionData.clients[0]}`);
    if (!response_client.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response_client.status}`);
    }
    const clientData = await response_client.json();
    document.getElementById('client').textContent = `${clientData.firstname} ${clientData.name}`
  } catch (error) {
    console.error('Erreur lors de la récupération des données de soumission :', error);
  }
};

// Appel de la fonction pour charger les données de soumission
fetchSubmissionData();

function modifySubmission() {
  // Récupérer les valeurs actuelles du formulaire
  const currentTitle = document.getElementById('title').value;
  const currentSurface = document.getElementById('surface').value;
  const currentPrice = document.getElementById('price').value;
  const currentLocation = document.getElementById('location').value;
  const currentImagePath = document.getElementById('image-path').value;
  const currentClient = document.getElementById('clients-list').value;
  const currentDescription = document.getElementById('description').value;

  // Construire l'objet formData avec les valeurs existantes
  const formData = {
    'clients': [currentClient],
  };

  // Vérifier et ajouter les valeurs modifiées
  if (currentTitle !== '') {
    formData['title'] = currentTitle;
  }
  if (currentSurface !== '') {
    formData['surface'] = currentSurface;
  }
  if (currentPrice !== '') {
    formData['price'] = currentPrice;
  }
  if (currentLocation !== '') {
    formData['location'] = currentLocation;
  }
  if (currentImagePath !== '') {
    formData['image_path'] = '/src/assets/' + currentImagePath;
  }
  if (currentDescription !== '') {
    formData['description'] = currentDescription;
  }

  // Effectuer la requête PATCH avec les données modifiées
  fetch(`${apiEndpoint}/api/submissions/${submissionId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/merge-patch+json',
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
    location.reload();
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error);
  });
}
