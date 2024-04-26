let url = window.location.href;
let params = new URLSearchParams(url);
let adminId = params.get('http://127.0.0.1:5500/src/client/signup.html?adminID');
const token = localStorage.getItem('jwt-token');
const apiEndpoint = 'http://127.0.0.1:8000';

function submitForm() {
  // Récupérer les valeurs des champs du formulaire
  let name = document.getElementById("name").value;
  let firstname = document.getElementById("firstname").value;
  let email = document.getElementById("email").value;
  let tel = document.getElementById("tel").value;
  let password = document.getElementById("password").value;
  let admin = `${apiEndpoint}/api/users/${adminId}`; // Utilisez la variable apiEndpoint pour construire l'URL

  // Créer un objet contenant les données à envoyer
  let userData = {
    "name": name,
    "firstname": firstname,
    "email": email,
    "tel": tel,
    "password": password,
    "roles": ["ROLE_CLIENT"],
    "admin": admin
  };

  // Envoyer les données à l'API via une requête POST
  fetch(`${apiEndpoint}/api/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/ld+json',
        'Content-Type': 'application/ld+json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/src/client/login.html'
      } else {
        console.error('Erreur lors de l\'inscription');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête POST :', error);
    });
}
