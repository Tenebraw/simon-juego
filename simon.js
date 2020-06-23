let juego = {
    contador: 0,
    posibilidades: ['#opcion1', '#opcion2', '#opcion3', '#opcion4', '#opcion5', '#opcion6'],
    juegoactual: [],
    jugador: [],
    sonidos: {
        opcion1: new Audio('sonidos/sonido1.mp3'),
        opcion2: new Audio('sonidos/sonido2.mp3'),
        opcion3: new Audio('sonidos/sonido3.mp3'),
        opcion4: new Audio('sonidos/sonido4.mp3'),
        opcion5: new Audio('sonidos/sonido5.mp3'),
        opcion6: new Audio('sonidos/sonido6.mp3'),
    }
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
    sonidos($campo);
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
        estado.textContent = 'Mal - Otra vez?';
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

function sonidos(x) {
    switch (x) {
        case '#opcion1':
            juego.sonidos.opcion1.play().playbackRate = 8.0;
            break;
        case '#opcion2':
            juego.sonidos.opcion2.play().playbackRate = 8.0;
            break;
        case '#opcion3':
            juego.sonidos.opcion3.play().playbackRate = 8.0;
            break;
        case '#opcion4':
            juego.sonidos.opcion4.play().playbackRate = 8.0;
            break;
        case '#opcion5':
            juego.sonidos.opcion5.play().playbackRate = 8.0;
            break;
        case '#opcion6':
            juego.sonidos.opcion6.play().playbackRate = 8.0;
            break;

    };
}

//Seccion canciones
cancionesIndex = 0;
canciones = ['musica/come-with-me.mp3', 'musica/nightfall.mp3', 'musica/on-the-run.mp3'];
artistas = ['TimeCop1983 ~', 'TimeCop1983 ~', 'TimeCop1983 ~'];
titulos = ['Come With Me', 'Nightfall', 'On The Run'];

let music = document.querySelector('#music');
music.volume = 0.2;
let artista = document.querySelector('.artista');
let titulo = document.querySelector('.titulo');

let playbutton = document.querySelector('#play');
playbutton.addEventListener("click", play);

function play() {
    if (music.paused) {
        music.play();
        playbutton.className = '';
        playbutton.className = 'fas fa-pause';
    } else {
        music.pause();
        playbutton.className = '';
        playbutton.className = 'fas fa-play';
    }
}

music.addEventListener('ended', function() {
    proximaCancion();
});


let playforward = document.querySelector('#adelantar');
playforward.addEventListener("click", proximaCancion);

function proximaCancion() {
    cancionesIndex++;

    if (cancionesIndex > 2) {
        cancionesIndex = 0;
    }
    music.src = canciones[cancionesIndex];
    artista.innerHTML = artistas[cancionesIndex];
    titulo.innerHTML = titulos[cancionesIndex];
    play();
}

let playbackward = document.querySelector('#volver');
playbackward.addEventListener("click", cancionAnterior);

function cancionAnterior() {
    cancionesIndex--;
    if (cancionesIndex < 0) {
        cancionesIndex = 2;
    }
    music.src = canciones[cancionesIndex];
    artista.innerHTML = artistas[cancionesIndex];
    titulo.innerHTML = titulos[cancionesIndex];
    play();
}

let barraprogreso = document.querySelector('#progress-bar');

setInterval(actualizarbarraProgreso, 500);

function actualizarbarraProgreso() {
    barraprogreso.max = music.duration;
    barraprogreso.value = music.currentTime;

}

function changeProgressBar() {
    music.currentTime = barraprogreso.value;
};