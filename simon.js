let juego = {
    contador: 0,
    posibilidades: ['#opcion1', '#opcion2', '#opcion3', '#opcion4', '#opcion5', '#opcion6'],
    juegoactual: [],
    jugador: [],
};

bloquearInput();
document.querySelector('#empezar').onclick = empezarJuego;

function empezarJuego() {
    limpiarJuego();
    comenzarJuego();
}

function limpiarJuego() {
    juego.contador = 0;
    juego.juegoactual = [];
}

function comenzarJuego() {
    generarMovimiento();
}

function generarMovimiento() {
    actualizarEstado('Presta atencion!');
    const anima = document.querySelector('#empezar');
    anima.classList.add('animate__shakeX');
    setTimeout(function() {
        anima.classList.remove('animate__shakeX');
    }, 500);

    juego.juegoactual.push(juego.posibilidades[(Math.floor(Math.random() * 6))]);
    let i = 0;
    let movimiento = setInterval(function() {
        mostrarMovimiento(juego.juegoactual[i]);
        i++;
        if (i >= juego.juegoactual.length) {
            clearInterval(movimiento);
        }
    }, 700);
    limpiarJugadormovimiento();
    juego.contador++;
    actualizarRonda();
}

function mostrarMovimiento($campo) {
    console.log($campo);
    const pointer = document.querySelector($campo);
    pointer.style['backgroundColor'] = 'black';
    setTimeout(function() {
        pointer.style['backgroundColor'] = '';
    }, 500);
    desbloquearInput();
    actualizarEstado('Tu turno!');
}

function limpiarJugadormovimiento() {
    juego.jugador = [];
}

function movimientoJugador(id) {
    const seleccion = "#" + id
    console.log(seleccion);
    juego.jugador.push(seleccion);
    mostrarMovimiento(seleccion);
    comprobacion(seleccion);
}

function comprobacion(x) {
    const estado = document.querySelector('#empezar');
    if (juego.jugador[juego.jugador.length - 1] !== juego.juegoactual[juego.jugador.length - 1]) {
        estado.textContent = 'Mal - Empezar de nuevo?';
        bloquearInput();
    }

    if (juego.jugador.length === juego.juegoactual.length && juego.jugador[juego.jugador.length - 1] === juego.juegoactual[juego.jugador.length - 1]) {
        estado.textContent = 'Bien!!!';
        setTimeout(generarMovimiento, 1000);
    }
}

function actualizarEstado(estados) {
    const estado = document.querySelector('#empezar');
    estado.textContent = estados;
}

function actualizarRonda() {
    const ronda = document.querySelector('#ronda');
    ronda.textContent = `Round n° ${juego.contador} !!`;
    ronda.classList.add('animate__backInDown');
    setTimeout(function() {
        ronda.classList.remove('animate__backInDown');
    }, 500);
}

function bloquearInput() {
    document.querySelectorAll('.col-4').forEach(function($cuadro) {
        $cuadro.removeAttribute('onclick');
    });
}

function desbloquearInput() {
    document.querySelectorAll('.col-4').forEach(function($cuadro) {
        $cuadro.setAttribute('onclick', 'movimientoJugador(this.id)');
    });
}