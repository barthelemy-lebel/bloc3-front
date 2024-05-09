const adminId = localStorage.getItem('userId')
const invitationLink = `http://127.0.0.1:5500/src/client/signup.html?adminID=${adminId}`
document.getElementById('invitation-link').textContent = invitationLink
document.getElementById('invitation-link').setAttribute('href', invitationLink)

const apiEndpoint = 'http://127.0.0.1:8000'
const selectClient = document.getElementById("clients-list")
const token = localStorage.getItem('jwt-token')

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

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
          console.log(clientData)
          let row = document.createElement("tr")
          row.className = "bg-white border border-gray-700"

          let nameCell = document.createElement("td")
          nameCell.setAttribute("scope", "row")
          nameCell.className = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-700"
          nameCell.textContent = `${clientData.name} ${clientData.firstname}`
          row.appendChild(nameCell)

          let emailCell = document.createElement("td");
          emailCell.className = "px-6 py-4 text-main-purple border border-gray-700";
          let emailLink = document.createElement("a");
          emailLink.href = `mailto:${clientData.email}`;
          emailLink.textContent = clientData.email;
          emailCell.appendChild(emailLink);
          row.appendChild(emailCell);

          let telCell = document.createElement("td")
          telCell.className = "px-6 py-4 text-main-purple border border-gray-700"
          let telLink = document.createElement('a')
          telLink.setAttribute('href', `tel:${clientData.tel}`)
          telLink.textContent = clientData.tel 
          telCell.appendChild(telLink)
          row.appendChild(telCell)

          let actionsCell = document.createElement("td")
          actionsCell.className = "px-6 py-4 flex flex-row"

          let clientActions = {
            'Supprimer': `${apiEndpoint}/api/users/${clientData.id}`,
            'Télécharger': `${apiEndpoint}/api/documents/`
          }
          for (let actionKey in clientActions) {
            let actionButton = document.createElement("button")
            let method = ''
            console.log(getKeyByValue(clientActions, clientActions[actionKey]))
            if (getKeyByValue(clientActions, clientActions[actionKey]) === "Supprimer") {
              method = "DELETE"
              bg_button = "bg-red-500"
              actionButton.className = `${bg_button} rounded-lg p-2 text-white mr-4`
              actionButton.textContent = actionKey.charAt(0).toUpperCase() + actionKey.slice(1)
              actionButton.title = 'Supprimer le client'
              actionsCell.appendChild(actionButton)
            } else if (clientData.documents.length != 0) {
              method = "GET"
              bg_button = "bg-green-600"
              console.log(clientData.documents)
              actionButton.className = `${bg_button} rounded-lg p-2 text-white mr-4`
              actionButton.textContent = actionKey.charAt(0).toUpperCase() + actionKey.slice(1)
              actionButton.title = 'Télécharger les documents'
              actionsCell.appendChild(actionButton)
            }
            
            actionButton.addEventListener('click', function(){
              if (method == "DELETE") {
                let actionUrl = clientActions[actionKey]
                console.log(method, actionUrl)
                fetch(actionUrl, {
                  method: method,
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
                  }
                })
                .catch(error => {
                  console.error('Erreur lors de la requête DELETE :', error)
                })
                setTimeout(function() {
                  location.reload()
                }, 500)
              } else {
                documents = []
                clientData.documents.forEach(documentUrl => {
                  fetch(`${apiEndpoint}${documentUrl}`)
                    .then(response => {
                      if (!response.ok) {
                        throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
                      }
                      return response.json()
                    })
                    .then(documentData => {
                      console.log(documentData)
                      window.open(documentData.path, "_blank")
                      documents.push(documentData.title)
                    })
                    .catch(error => {
                      console.error('Erreur lors de la requête clientData :', error)
                    })
                });
                alert(documents)
              }
            })
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
