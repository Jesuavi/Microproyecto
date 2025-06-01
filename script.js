const preguntas = [
    {
        pregunta: "¿En qué videojuego aparece el personaje de Solid Snake como protagonista?",
        respuesta: [
            { texto: "Splinter Cell", correcta: false },
            { texto: "Metal Gear Solid", correcta: true },
            { texto: "Hitman", correcta: false },
            { texto: "Ghost Recon", correcta: false },
        ]
    },
    {
        pregunta: "¿Cuál es el nombre del protagonista de la saga God of War?",
        respuesta: [
            { texto: "Dante", correcta: false },
            { texto: "Kratos", correcta: true },
            { texto: "Ares", correcta: false },
            { texto: "Leon", correcta: false },
        ]
    },
    {
        pregunta: "¿Qué desarrolladora creó el juego Grand Theft Auto V?",
        respuesta: [
            { texto: "Ubisoft", correcta: false },
            { texto: "Rockstar Games", correcta: true },
            { texto: "Activision", correcta: false },
            { texto: "Electronic Arts", correcta: false },
        ]
    },
    {
        pregunta: "¿En qué año se lanzó el juego The Elder Scrolls V: Skyrim?",
        respuesta: [
            { texto: "2010", correcta: false },
            { texto: "2011", correcta: true },
            { texto: "2012", correcta: false },
            { texto: "2013", correcta: false },
        ]
    },
    {
        pregunta: "¿Cuál de estos juegos es un título exclusivo de Nintendo?",
        respuesta: [
            { texto: "Halo", correcta: false },
            { texto: "Uncharted", correcta: false },
            { texto: "The Legend of Zelda", correcta: true },
            { texto: "The Last of Us", correcta: false },
        ]
    },
    {
        pregunta: "¿Cuál de estos juegos pertenece al género Soulslike?",
        respuesta: [
            { texto: "Bloodborne", correcta: true },
            { texto: "Far Cry 3", correcta: false },
            { texto: "Overwatch", correcta: false },
            { texto: "Tomb Raider", correcta: false },
        ]
    },
    {
        pregunta: "¿En qué juego puedes encontrar la ciudad de Vice City?",
        respuesta: [
            { texto: "Grand Theft Auto: San Andreas", correcta: false },
            { texto: "Grand Theft Auto III", correcta: false },
            { texto: "Grand Theft Auto: Vice City", correcta: true },
            { texto: "Grand Theft Auto V", correcta: false },
        ]
    },
    {
        pregunta: "¿Cómo se llama el icónico enemigo de la saga Super Mario Bros.?",
        respuesta: [
            { texto: "Dr. Eggman", correcta: false },
            { texto: "Bowser", correcta: true },
            { texto: "Wario", correcta: false },
            { texto: "Ridley", correcta: false },
        ]
    },
    {
        pregunta: "¿Cuál fue la primera consola de videojuegos creada en la historia?",
        respuesta: [
            { texto: "Atari 2600", correcta: false },
            { texto: "Magnavox Odyssey", correcta: true },
            { texto: "Nintendo Entertainment System (NES)", correcta: false },
            { texto: "Sega Genesis", correcta: false },
        ]
    },
    {
        pregunta: "¿Qué juego de rol japonés es conocido por su sistema de combate por turnos y sus invocaciones?",
        respuesta: [
            { texto: "Final Fantasy VII", correcta: true },
            { texto: "Persona 5", correcta: false },
            { texto: "Dragon Quest XI", correcta: false },
            { texto: "Chrono Trigger", correcta: false },
        ]
    }
];

const preguntaElemento = document.getElementById('pregunta');
const botonesRespuesta = document.getElementById('botones_respuesta');
const botonSiguiente = document.getElementById('boton_siguiente');

let indicePreguntaActual = 0;
let puntaje = 0;

function iniciarQuiz() {
    indicePreguntaActual = 0;
    puntaje = 0;
    botonSiguiente.innerHTML = "Siguiente";
    mostrarPregunta();
}

function mostrarPregunta() {
    resetState();
    let preguntaActual = preguntas[indicePreguntaActual]; // Cambiado 'pregunta' por 'preguntas'
    let numeroPregunta = indicePreguntaActual + 1;
    preguntaElemento.innerHTML = numeroPregunta + ". " + preguntaActual.pregunta;

    preguntaActual.respuesta.forEach(respuesta => { // Cambiado 'respuestas' por 'respuesta'
        const button = document.createElement('button');
        button.innerHTML = respuesta.texto;
        button.classList.add('btn');
        botonesRespuesta.appendChild(button);
        if (respuesta.correcta) {
            button.dataset.correct = respuesta.correcta;
        }
        button.addEventListener("click",seleccionarRespuesta);
    });
}

function resetState() {
    botonSiguiente.style.display = 'none';
    while (botonesRespuesta.firstChild) {
        botonesRespuesta.removeChild(botonesRespuesta.firstChild);
    }
}

function seleccionarRespuesta(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        selectedButton.classList.add('correcto');
        puntaje++;
    } else {
        selectedButton.classList.add('incorrecto');
    }

    Array.from(botonesRespuesta.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correcto');
        } 
        button.disabled = true;
    });

    botonSiguiente.style.display = 'block';
}

function siguientePregunta() {
    indicePreguntaActual++;
    if (indicePreguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarPuntaje();
    }
}

// Agrega este event listener después de definir la función:
botonSiguiente.addEventListener("click", siguientePregunta);

// Agrega esta función para mostrar el puntaje final:
function mostrarPuntaje() {
    resetState();
    preguntaElemento.innerHTML = `¡Quiz terminado!<br>Tu puntaje es ${puntaje} de ${preguntas.length}.`;
    botonSiguiente.innerHTML = "Reiniciar";
    botonSiguiente.style.display = "block";
    botonSiguiente.onclick = function() {
        iniciarQuiz();
    };
}


iniciarQuiz();
