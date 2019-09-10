import zxcvbn from 'zxcvbn'

export default {
  bind (element) {
    function passwordStrengthHandler (e) {
      const value = e ? e.target.value : ''

      return zxcvbn(value).score
    }

    function updateDomHandler (e) {
      const progressBar = document.querySelector('.progress')

      progressBar.value = passwordStrengthHandler(e)
    }

    function init () {
      const div = document.createElement('div')
      const progress = document.createElement('progress')
      const text = document.createElement('p')

      text.innerHTML = 'Password strength'

      div.setAttribute('class', 'password-strength')
      progress.setAttribute('class', 'progress is-small')
      progress.setAttribute('max', 4)

      div.append(text)
      div.append(progress)
      element.insertBefore(div, element.children[2])

      updateDomHandler()
    }

    // on load add password strength element to page
    init()
    element.addEventListener('input', updateDomHandler)
  }
}
