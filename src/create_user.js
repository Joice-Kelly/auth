import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

import { firebaseApp } from './config/firebase'

const $ = document.getElementById.bind(document)

const onSubmitRegistrationForm = (event) => {
  event.preventDefault()

  const email = $('email').value
  const password = $('password').value
  const passwordConfirmation = $('password-confirmation').value

  if (password === passwordConfirmation) {
    const auth = getAuth(firebaseApp)

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const resultPanel = $('result-panel')
        const resultMessage = $('result-message')
        resultMessage.innerText = 'Usuário cadastrado com sucesso!'
        resultMessage.style.display = 'block'
        resultPanel.style.display = 'block'
        $('login-link').style.display = 'block'

        const successImage = $('success-image')
        successImage.style.display = 'inline'
        const errorImage = $('error-image')
        errorImage.style.display = 'none'
      })
      .catch((error) => {
        const { code } = error
        let errorMessage = 'Ocorreu um erro ao tentar criar a conta'

        if (code === 'auth/weak-password') {
          errorMessage = 'Senha muito fraca'
        } else if (code === 'auth/email-already-in-use') {
          errorMessage = 'Já existe um usuário com este e-mail'
        }

        const resultPanel = $('result-panel')
        const resultMessage = $('result-message')
        resultMessage.innerText = errorMessage
        resultMessage.style.display = 'block'
        resultPanel.style.display = 'block'
        $('login-link').style.display = 'none'

        const successImage = $('success-image')
        successImage.style.display = 'none'

        const errorImage = $('error-image')
        errorImage.style.display = 'inline'      
      })
  }
}

$('registration-form').onsubmit = onSubmitRegistrationForm