const apiEndpoint = 'http://127.0.0.1:8000'
const token = localStorage.getItem('jwt-token')
const adminEmail= localStorage.getItem('email')

fetch(`${apiEndpoint}/api/users/email/${adminEmail}`, {
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
  })
  .then(adminData => {
    console.log(adminData)
    localStorage.setItem('userId', adminData.id)
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error)
  })

fetch(`${apiEndpoint}/api/users/${localStorage.getItem('userId')}`, {
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
  })
  .then(adminData => {
    console.log(adminData)
    document.getElementById('name').textContent = adminData.firstname
    document.getElementById('main-nbClients').textContent = adminData.clients.length
    document.getElementById('main-nbAnnonces').textContent = adminData.submissions.length

  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error)
  })

function addSubmission() {
  const fileInput = document.getElementById('image-path');
  const file = fileInput.files[0];
  const url = `https://firebasestorage.googleapis.com/v0/b/meet-imo.appspot.com/o/${file.name}?alt=media`;

  // Utilisez l'API Fetch pour envoyer une requête POST avec le fichier
  fetch(url, {
    method: 'POST',
    body: file,
    headers: {
      'Content-Type': file.type // Spécifiez le type MIME du fichier
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Impossible d'envoyer le fichier.");
    }
    return response.json();
  })
  .then(data => {
    console.log(url)
    localStorage.setItem('url', url)
    // Construisez formData une fois que le fichier est envoyé
    const formData = {
      'title': document.getElementById('title').value,
      'surface': document.getElementById('surface').value,
      'price': document.getElementById('price').value,
      'location': document.getElementById('location').value,
      'imagePath': localStorage.getItem('url'),
      'users': [`${apiEndpoint}/api/users/${localStorage.getItem('userId')}`],
      'clients': [document.getElementById('clients-list').value],
      'description': document.getElementById('description').value
    };
    console.log(formData)
    // Envoyer les données à l'API backend
    return fetch(`${apiEndpoint}/api/submissions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/ld+json',
      },
      body: JSON.stringify(formData),
    });
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data)
    location.reload();
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error);
  });
}
