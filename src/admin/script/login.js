const apiEndpoint = 'http://127.0.0.1:8000/admin'

async function login() {
    try {
        const userEmail = document.getElementById('email').value
        const response = await fetch(`${apiEndpoint}/${userEmail}`)

        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
        }

        const userData = await response.json()
        const password = userData.password

        if (password === document.getElementById('password').value) {
            window.location.href = 'accueil.html'
            console.log(userData)
            localStorage.setItem('email', userData.email)
            localStorage.setItem('id', userData.id)
            localStorage.setItem('nom', userData.nom)
            localStorage.setItem('prenom', userData.prenom)
            localStorage.setItem('password', userData.password)
            localStorage.setItem('tel', userData.tel)
            localStorage.setItem('clients', userData.clients)
            localStorage.setItem('submission', userData.submission)
        } else {
            document.getElementById('password-placeholder').textContent = 'Mot de passe incorrect'
            document.getElementById('password-placeholder').style.color = 'red'
        }
    } catch (error) {
        console.error('Erreur :', error)
    }
}
