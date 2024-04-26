const apiEndpoint = 'http://127.0.0.1:8000'
const selectClient = document.getElementById("clients-list")
const token = localStorage.getItem('jwt-token')

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
    const clients = adminData.clients
    clients.forEach(client => {
      fetch(`${apiEndpoint}${client}`, {
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
        .then(clientData => {
          const option = document.createElement("option");
          option.text = clientData.firstname + " " + clientData.name
          console.log(client)
          option.value = client;
          selectClient.appendChild(option)
        })
        .catch(error => {
          console.error('Erreur lors de la requête :', error)
        })
    });

  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error)
  })
