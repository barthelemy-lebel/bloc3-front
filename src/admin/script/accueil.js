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
  const formData = {
    'title': document.getElementById('title').value,
    'surface': document.getElementById('surface').value,
    'price': document.getElementById('price').value,
    'location': document.getElementById('location').value,
    'image_path': document.getElementById('image-path').value,
    'users': [`${apiEndpoint}/api/users/${localStorage.getItem('userId')}`],
    'clients': [document.getElementById('clients-list').value],
    'description': document.getElementById('description').value
  }

  fetch(`${apiEndpoint}/api/submissions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/ld+json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
    }
    return response.json()
  })
  .then(data => {
    location.reload()
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error)
  })
}
