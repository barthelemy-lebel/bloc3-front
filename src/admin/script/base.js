function logout() {
  localStorage.clear()
  window.location.href = '/src/admin/login.html'
}
console.log("test")
if (!localStorage.getItem("jwt-token")){
  alert('Vous devez vous identifier !')
  window.location.href = '/src/admin/login.html'
}
