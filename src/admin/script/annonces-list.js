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
    return response.json() // Convertir la réponse en JSON
  })
  .then(adminData => {
    const submissions = adminData.submissions
    submissions.forEach(submission_url => {
      fetch(`http://127.0.0.1:8000${submission_url}`)
        .then(submissionResponse => {
          if (!submissionResponse.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${submissionResponse.status}`)
          }
          return submissionResponse.json() // Convertir la réponse en JSON
        })
        .then(submissionData => {
          // Faites quelque chose avec les données de soumission, par exemple, créez une carte avec les données
          const newCard = document.createElement('app-submission')
          newCard.title = submissionData.title
          newCard.price = submissionData.price
          newCard.surface = submissionData.surface
          newCard.location = submissionData.location

          // Ajoutez la nouvelle carte à votre application, par exemple, à un conteneur existant avec l'ID 'cardContainer'
          document.getElementById('submissionContainer').appendChild(newCard)
        })
        .catch(error => {
          console.error('Erreur lors de la requête :', error)
        })
    })
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error)
  })
