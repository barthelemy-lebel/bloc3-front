const apiEndpoint = 'http://127.0.0.1:8000'
const adminId = localStorage.getItem('id')

fetch(`${apiEndpoint}/api/admins/${adminId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
    }
    return response.json()
  })
  .then(adminData => {
    const clients = adminData.clients

    const tbody = document.getElementById("clients-tab").getElementsByTagName("tbody")[0]

    clients.forEach(clientUrl => {
      fetch(`${apiEndpoint}${clientUrl}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
          }
          return response.json()
        })
        .then(clientData => {
          
          let row = document.createElement("tr")
          row.className = "bg-white border-b border-gray-700"

          let nameCell = document.createElement("th")
          nameCell.setAttribute("scope", "row")
          nameCell.className = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          nameCell.textContent = `${clientData.name} ${clientData.firstname}`
          row.appendChild(nameCell)

          let emailCell = document.createElement("td")
          emailCell.className = "px-6 py-4"
          emailCell.textContent = clientData.email 
          row.appendChild(emailCell)

          let actionsCell = document.createElement("td")
          actionsCell.className = "px-6 py-4"

          let clientActions = {
            'Supprimer': `${apiEndpoint}/api/admins/${clientData.id}`
          }
          for (let actionKey in clientActions) {
            let actionButton = document.createElement("button")
            actionButton.setAttribute("action", clientActions[actionKey])
            actionButton.textContent = actionKey.charAt(0).toUpperCase() + actionKey.slice(1) 
            actionsCell.appendChild(actionButton)
          }

          row.appendChild(actionsCell)

          tbody.appendChild(row)
        })
        .catch(error => {
          console.error('Erreur lors de la requête clientData :', error)
        })
    })
  })
  .catch(error => {
    console.error('Erreur lors de la requête adminData :', error)
  })

