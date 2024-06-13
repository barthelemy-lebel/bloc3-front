
id = localStorage.getItem('userId')

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



function addSubmission() {
  const fileInput = document.getElementById('image-path');
  const file = fileInput.files[0];
  const url = `https://firebasestorage.googleapis.com/v0/b/meet-imo.appspot.com/o/${file.name}?alt=media`;

  // Utilisez l'API Fetch pour envoyer une requête POST avec le fichier
  fetch(url, {
    method: 'POST',
    body: file,
    headers: {
      'Content-Type': file.type // Spécifiez le type MIME du fichier
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Impossible d'envoyer le fichier.");
    }
    return response.json();
  })
  .then(data => {
    console.log(url)
    localStorage.setItem('url', url)
    // Construisez formData une fois que le fichier est envoyé
    const formData = {
      'title': document.getElementById('title').value,
      'surface': document.getElementById('surface').value,
      'price': document.getElementById('price').value,
      'location': document.getElementById('location').value,
      'imagePath': localStorage.getItem('url'),
      'users': [`${apiEndpoint}/api/users/${localStorage.getItem('userId')}`],
      'clients': [document.getElementById('clients-list').value],
      'description': document.getElementById('description').value
    };
    console.log(formData)
    // Envoyer les données à l'API backend
    return fetch(`${apiEndpoint}/api/submissions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/ld+json',
      },
      body: JSON.stringify(formData),
    });
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data)
    location.reload();
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error);
  });
}


const sidebar = document.getElementById('default-sidebar')
const sidebarToggle = document.getElementById('sidebarToggle')
const sidebarLogo = document.getElementById('sidebarLogo')

let isSidebarOpen = false

const toggleSidebar = () => {
    isSidebarOpen = !isSidebarOpen
    sidebar.classList.toggle('-translate-x-full', !isSidebarOpen)
}

const closeSidebar = () => {
    isSidebarOpen = false
    sidebar.classList.add('-translate-x-full')
}

sidebarToggle.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleSidebar()
})

sidebarLogo.addEventListener('click', (event) => {
    event.stopPropagation()
    closeSidebar()
})

document.addEventListener('click', (event) => {
    const isClickInside = sidebar.contains(event.target) || sidebarToggle.contains(event.target)
    if (!isClickInside && isSidebarOpen) {
        closeSidebar()
    }
})

function toggleModal() {
  const modal = document.getElementById('modal')
  modal.classList.toggle('hidden')
}