const apiEndpoint = 'http://127.0.0.1:8000/api/'
const prenom = localStorage.getItem('prenom')
const nom = localStorage.getItem('nom')
const clients = localStorage.getItem('clients')
const annonces = localStorage.getItem('submission')
const id = localStorage.getItem('id')
const $popup = document.querySelector('app-popup')

fetch(`${apiEndpoint}admins/${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
    }
    return response.json()
  })
  .then(adminData => {
    const nbClients = adminData.clients.length
    const nbSubmissions = adminData.submissions.length

    document.getElementById("name").textContent = prenom
    document.getElementById("nbClients").textContent = nbClients
    document.getElementById("nbAnnonces").textContent = nbSubmissions
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
    'admin': `${apiEndpoint}admins/${id}`
  }

  fetch('http://127.0.0.1:8000/api/submissions', {
    method: 'POST',
    headers: {
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
    $popup.show()
    setTimeout(function() {
      $popup.hide()
      location.reload()
    }, 800)
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error)
  })
}
