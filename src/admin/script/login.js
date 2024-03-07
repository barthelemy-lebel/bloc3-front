const apiEndpoint = 'http://127.0.0.1:8000/admin'

async function searchUserByEmail() {
    try {
        const userEmail = document.getElementById('email').value

        const response = await fetch(`${apiEndpoint}/${userEmail}`)

        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
        }

        const userData = await response.json()
        console.log(userData)
        
        const password = userData.password

        if (password === document.getElementById('password').value) {
            console.log("Mot de passe correct")

            // Redirection vers une autre page HTML
            window.location.href = 'page_suivante.html'
        } else {
            document.getElementById('password').textContent = 'Mot de passe incorrect'
            document.getElementById('password-placeholder').style.color = 'red'
        }

        return userData
    } catch (error) {
        console.error('Erreur :', error)
    }
}
