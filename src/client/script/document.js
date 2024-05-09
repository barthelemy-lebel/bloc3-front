function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}


function fetchUserDocument(apiEndpoint, token, userId) {
  fetch(`${apiEndpoint}/api/users/${userId}`, {
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
  .then(userData => {
    getDocumentData(apiEndpoint, token, userData.documents)
  })
}

function downloadDoc(url, name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob'; // Réponse sous forme de blob (binaire)

  xhr.onload = function() {
    if (xhr.status === 200) {
      var blob = new Blob([xhr.response], { type: 'application/octet-stream' });
      var urlBlob = window.URL.createObjectURL(blob);
      var lien = document.createElement('a');
      lien.href = urlBlob;
      lien.download = name || 'document_telecharge';
      document.body.appendChild(lien);
      lien.click();
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(lien);
    }
  };
  xhr.send();
}

function getDocumentData(apiEndpoint, token, documents) {
  const tbody = document.getElementById("clients-tab").getElementsByTagName("tbody")[0]
  documents.forEach(documentUrl => {
    fetch(`${apiEndpoint}${documentUrl}`, {
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
      .then(documentData => {
        
        let row = document.createElement("tr")
        
        row.className = "bg-white border border-gray-700"
  
        let nameCell = document.createElement("td")
        nameCell.setAttribute("scope", "row")
        nameCell.className = "px-6 py-4 font-medium whitespace-nowrap border border-gray-700 text-purple-800"
        link = document.createElement("a")
        link.href = documentData.path
        link.target = "_blank"
        link.download = documentData.title
        link.textContent = documentData.title
        link.id = documentData.title
        nameCell.appendChild(link)
        row.appendChild(nameCell)

        let actionsCell = document.createElement("td")
        actionsCell.className = "px-6 py-4 flex flex-row items-center justify-between"

        let documentActions = {
          'Supprimer': `${apiEndpoint}/api/documents/${documentData.id}`,
          'Télécharger': `${apiEndpoint}/api/documents/`
        }
        for (let actionKey in documentActions) {
          let actionButton = document.createElement("button")
          let method = ''
          if (getKeyByValue(documentActions, documentActions[actionKey]) === "Supprimer") {
            method = "DELETE"
            bg_button = "bg-red-500"
          } else {
            method = "GET"
            bg_button = "bg-green-600"
          }
          actionButton.className = `${bg_button} rounded-lg p-2 text-white mr-4`
          actionButton.textContent = actionKey.charAt(0).toUpperCase() + actionKey.slice(1)
          actionsCell.appendChild(actionButton)
          actionButton.addEventListener('click', function(){
            if (method == "DELETE") {
              
              let actionUrl = documentActions[actionKey]
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
              console.log(documentData.title)
              link = document.getElementById(documentData.title)
              console.log(link)
              link.click()
            }
          })  
        }

        row.appendChild(actionsCell)
        tbody.appendChild(row)
      })
  });  
}

function downloadFile(url) {
  console.log(url)
  fetch(url)
    .then(response => {
      // Vérifiez si la réponse est OK
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du fichier');
      }
      // Retourne le contenu du fichier sous forme de blob
      return response.blob();
    })
    .then(blob => {
      // Crée un objet URL à partir du blob
      const url = URL.createObjectURL(blob);
      // Crée un lien <a> pour télécharger le fichier
      const link = document.createElement('a');
      link.href = url;
      link.download = "filename.pdf"; // Nom du fichier à télécharger
      // Ajoute le lien au corps du document
      document.body.appendChild(link);
      // Simule un clic sur le lien pour déclencher le téléchargement
      link.click();
      // Supprime le lien du corps du document
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error(error);
    });
}


const apiEndpoint = 'http://127.0.0.1:8000';
const token = localStorage.getItem('jwt-token');
const userId = localStorage.getItem('userId');
const documents = fetchUserDocument(apiEndpoint, token, userId)

const fileInput = document.getElementById('dropzone-file');

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];

  try {
    // Obtenez l'URL de téléchargement pour le fichier
    const url = `https://firebasestorage.googleapis.com/v0/b/meet-imo.appspot.com/o/${file.name}?alt=media`; // Remplacez par votre URL de téléchargement

    // Utilisez l'API Fetch pour envoyer une requête POST avec le fichier
    const response = await fetch(url, {
      method: 'POST',
      body: file
    });

    if (response.ok) {
      console.log('Upload réussi');
      documentPath = url
      const documentData = {
        "title": file.name,
        "path": documentPath,
        "user": "http://127.0.0.1:8000/api/users/"+localStorage.getItem('userId')
      }
      fetch(`http://127.0.0.1:8000/api/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/ld+json',
          'Content-Type': 'application/ld+json'
        },
        body: JSON.stringify(documentData)
      })
      .then(response => {
        if (response.ok) {
          window.location.href = '/src/client/document.html'
        } else {
          console.error('Erreur lors de l\'inscription');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête POST :', error);
      });

      
    } else {
      throw new Error('Erreur lors de l\'upload');
    }
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
  }
  
});