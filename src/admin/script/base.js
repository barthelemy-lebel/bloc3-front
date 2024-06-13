function logout() {
  localStorage.clear()
  window.location.href = '#/'
}

if (!localStorage.getItem("jwt-token")){
  alert('Vous devez vous identifier !')
  window.location.href = '#/'
}
