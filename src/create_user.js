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
        const htmlContent = `
          <span id="success-message">
            Usuário cadastrado com sucesso!
          </span>

          <a id="login-link" href="login.html">
            Clique aqui para fazer login
          </a>
        `
        resultPanel.innerHTML = htmlContent
      })
      .catch((error) => {
        const { code } = error
        let errorMessage = 'Ocorreu um erro ao tentar criar a conta'

        if (code === 'auth/weak-password') {
          errorMessage = 'Senha muito fraca'
        } else if (code === 'auth/email-already-in-use') {
          errorMessage = 'Já existe um usuário com este e-mail'
        }

        $('result-panel').innerText = errorMessage
      })
  }
}

$('registration-form').onsubmit = onSubmitRegistrationForm