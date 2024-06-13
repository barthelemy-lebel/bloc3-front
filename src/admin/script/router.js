const router = new Router({
  mode: 'hash',
  root: '/'
})


router.add('', () => {
  loadPage('/src/admin/login.html', '/src/admin/script/login.js')
})

router.add('accueil', () => {
  loadPage('/src/admin/accueilV2.html', '/src/admin/script/accueil.js')
})

router.add('annonces', () => {
  loadPage('/src/admin/annoncesV2.html', '/src/admin/script/annonces-list.js')
})

router.add('clients', () => {
  loadPage('/src/admin/clients.html', '/src/admin/script/clients.js')
})


// Fonction pour charger une page via AJAX et exécuter son script
function loadPage(url, scriptUrl) {
  fetch(url)
      .then(response => response.text())
      .then(html => {
          document.getElementById('app').innerHTML = html
          if (scriptUrl) {
              loadScript(scriptUrl)
          }
      })
      .catch(err => console.warn('Quelque chose a mal tourné.', err))
}

// Fonction pour charger et exécuter un script
function loadScript(url) {
  const script = document.createElement('script')
  script.src = url
  script.onload = () => {
      console.log(`${url} chargé et exécuté.`)
  }
  document.body.appendChild(script)
}

// Démarrer le routeur
router.check().addUriListener()

// Rediriger vers la route par défaut si aucune autre route n'est spécifiée
window.addEventListener('load', () => {
  if (!location.hash) {
      location.hash = '#/'
  } else {
      router.check()
  }
})
