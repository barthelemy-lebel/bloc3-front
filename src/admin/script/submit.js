export function reloadPageAndClearForm(formId) {
  const $popup = document.querySelector('app-popup')
  $popup.show()
  setTimeout(function() {
    $popup.hide()
  }, 1000)
  location.reload()
  document.getElementById(formId).reset()
}
