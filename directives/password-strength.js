import zxcvbn from 'zxcvbn'

export default {
  bind (element) {
    function passwordStrengthHandler (e) {
      const value = e ? e.target.value : ''

      return zxcvbn(value).score
    }

    function updateDomHandler (e) {
      const strengths = ['Weak', 'Ok', 'Good', 'Very good', 'Excellent']
      const progressBar = document.querySelector('.progress')
      const strengthsText = document.querySelector('.strength')

      if (!progressBar) {
        return
      }
      progressBar.value = passwordStrengthHandler(e)
      strengthsText.innerHTML = strengths[passwordStrengthHandler(e)]
    }

    function init () {
      const div = document.createElement('div')
      const progress = document.createElement('progress')
      const text = document.createElement('p')

      div.setAttribute('class', 'password-strength')
      progress.setAttribute('class', 'progress')
      progress.setAttribute('max', 4)
      text.setAttribute('class', 'strength')

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
