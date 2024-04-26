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
    localStorage.setItem('userId', adminData.id)
    localStorage.setItem('role', adminData.roles[0])
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error)
  })