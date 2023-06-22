const token = localStorage.getItem('token')

// Se token não tiver valor...
if (!token) {
  window.location.href = 'login.html'
} else {
  document.getElementById('app').innerHTML = `
    <h1>Welcome!</h1>
    <a href="logout.html">Clique aqui para sair</a>
  `
}