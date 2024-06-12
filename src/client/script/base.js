function logout() {
  localStorage.clear()
  window.location.href = '/src/client/login.html'
}

if (!localStorage.getItem("jwt-token")){
  alert('Vous devez vous identifier !')
  window.location.href = '/src/client/login.html'
}
