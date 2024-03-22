const apiEndpoint = 'http://127.0.0.1:8000/api/submissions/'
const submissionId = localStorage.getItem('submission_id')

const response = await fetch(`${apiEndpoint}${submissionId}`)

if (!response.ok) {
  throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
}

const submissionData = await response.json()
document.getElementById('title').textContent = submissionData.title
document.getElementById('location').textContent = submissionData.location
document.getElementById('surface').textContent = submissionData.surface
document.getElementById('price').textContent = submissionData.price
document.getElementById('description').textContent = submissionData.description
