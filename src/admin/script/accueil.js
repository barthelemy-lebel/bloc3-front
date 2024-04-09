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
    const nbSubmissions = adminData.submissions.length

    document.getElementById("name").textContent = adminData.firstname
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
