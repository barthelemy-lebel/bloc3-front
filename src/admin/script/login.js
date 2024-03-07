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
            window.location.href = 'page_suivante.html'
        } else {
            document.getElementById('password-placeholder').textContent = 'Mot de passe incorrect'
            document.getElementById('password-placeholder').style.color = 'red'
        }
    } catch (error) {
        console.error('Erreur :', error)
    }
}
