const apiEndpoint = 'http://127.0.0.1:8000'

async function login() {
    const userEmail = document.getElementById('email').value
    const userPassword = document.getElementById('password').value    
    fetch(`${apiEndpoint}/auth`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Renvoyer la promesse de la conversion JSON
    })
    .then(data => {
        const token = data.token;
        console.log(token);
        localStorage.setItem('jwt-token', token)
        window.location.href = 'accueil.html';
    })
    .catch(error => {
        console.error('There was an error with the fetch operation:', error);
    });
}
