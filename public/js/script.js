// Esperamos a que la paginas se termine de cargar para ejecutar el codigo
window.onload = () =>{
  const nav_button = document.getElementById("nav-button");
  nav_button.addEventListener('click', accion, false)
}


function accion() {
  var ancla = document.getElementsByClassName('nav-enlace')
  for(var i = 0; i < ancla.length; i++) {
      ancla[i].classList.toggle('desaparece')
  }

}


function counter() {
  let countdown = 5;

  let timerDiv = document.getElementById("timer");

  let timer = setInterval(function () {
    timerDiv.innerHTML = `Volvera al home en ${countdown}`;
    console.error('Ejecucion')
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = "./"
    }
  }, 500);
}