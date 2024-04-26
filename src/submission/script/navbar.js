
if (role == "ROLE_CLIENT") {
  const prefix = "/src/client/"
  links = [["link-accueil", "accueil.html"], ["link-document", "document.html"], ["link-login", "login.html"]]
  const linkClient = document.getElementById('link-client')
  linkClient.className = "hidden"
  const linkSubmission= document.getElementById('link-submission')
  linkSubmission.className = "hidden"
  links.forEach(link => {
    document.getElementById(link[0]).href = prefix + link[1]
  })
} else {
  const prefix = "/src/admin/"
  links = [["link-accueil", "accueilV2.html"], ["link-client", "clients.html"], ["link-login", "login.html"], ['link-submission', 'annoncesV2.html']]
  const linkClient = document.getElementById('link-document')
  linkClient.className = "hidden"
  links.forEach(link => {
    document.getElementById(link[0]).href = prefix + link[1]
  })
}
