const apiEndpoint = 'http://127.0.0.1:8000'
const token = localStorage.getItem('jwt-token')
const id = localStorage.getItem('userId')

fetch(`${apiEndpoint}/api/users/${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
    }
    return response.json()
  })
  .then(userData => {
    const submissions = userData.submissions
    submissions.forEach(submission_url => {
      fetch(`${apiEndpoint}${submission_url}`)
        .then(submissionResponse => {
          if (!submissionResponse.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${submissionResponse.status}`)
          }
          return submissionResponse.json()
        })
        .then(submissionData => {
          const newSubmission = document.createElement('app-submission');
          const submissionContainer = document.createElement('div');
          if (!submissionData.image_path) {
            submissionData.image_path = '/src/assets/default-image.png'
          }
          
          submissionContainer.className = 'xs:mr-auto xs:ml-auto xl:mr-4 mt-4'
          newSubmission.setAttribute('title', submissionData.title);
          newSubmission.setAttribute('price', submissionData.price);
          newSubmission.setAttribute('location', submissionData.location);
          newSubmission.setAttribute('surface', submissionData.surface);
          newSubmission.setAttribute('image', submissionData.image_path);
          newSubmission.setAttribute('id', submissionData.id);
          newSubmission.setAttribute('client', submissionData.clients)
          submissionContainer.appendChild(newSubmission);
          document.getElementById('submissions-container').appendChild(submissionContainer);
        })
        .catch(error => {
          console.error('Erreur lors de la requête :', error)
        })
    })
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error)
  })
