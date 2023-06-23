import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseApp } from './config/firebase'

const $ = document.getElementById.bind(document)

const authStatuses = [
  'auth/wrong-password',
  'auth/user-not-found',
  'auth/invalid-email',
]

const onSubmitLoginForm = (event) => {
  event.preventDefault()

  const email = $('email').value
  const password = $('password').value

  const auth = getAuth(firebaseApp)

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const { user } = userCredential
      const token = await user.getIdToken()
      localStorage.setItem('token', token)
      window.location.href = 'index.html'
    })
    .catch((error) => {
      let errorMessage = 'Ocorreu um erro ao tentar realizar o login'
      const { code } = error

      if (authStatuses.includes(code)) {
        errorMessage = 'Usuário não autenticado';
        const alertMsg = document.querySelector('.alert-msg');
        alertMsg.innerText=errorMessage;
        const resultPanel = document.getElementById('result-panel');
        resultPanel.classList.add('show')
        setTimeout(()=>{
          resultPanel.classList.remove('show')
          }, 3000);
      }
      else{
        $('result-panel').innerText = errorMessage
      }
    })
}

$('login-form').addEventListener('submit', onSubmitLoginForm);