// BANCO DE PREGUNTAS EXPANDIDO (15 preguntas)
const bancoPreguntasCompleto = [
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
    },
    //  NUEVAS PREGUNTAS AGREGADAS 
    {
        pregunta: "¿Cuál es la moneda virtual utilizada en el juego Fortnite?",
        respuesta: [
            { texto: "V-Bucks", correcta: true },
            { texto: "Coins", correcta: false },
            { texto: "Credits", correcta: false },
            { texto: "Gems", correcta: false },
        ]
    },
    {
        pregunta: "¿En qué año se lanzó el primer juego de la saga Pokémon?",
        respuesta: [
            { texto: "1995", correcta: false },
            { texto: "1996", correcta: true },
            { texto: "1997", correcta: false },
            { texto: "1998", correcta: false },
        ]
    },
    {
        pregunta: "¿Cuál de estos juegos NO fue desarrollado por Valve Corporation?",
        respuesta: [
            { texto: "Half-Life", correcta: false },
            { texto: "Portal", correcta: false },
            { texto: "Team Fortress 2", correcta: false },
            { texto: "Overwatch", correcta: true },
        ]
    },
    {
        pregunta: "¿Qué personaje es el mascota oficial de Sonic the Hedgehog?",
        respuesta: [
            { texto: "Knuckles", correcta: false },
            { texto: "Tails", correcta: true },
            { texto: "Shadow", correcta: false },
            { texto: "Amy Rose", correcta: false },
        ]
    },
    {
        pregunta: "¿Cuál es el nombre del protagonista de la saga The Witcher?",
        respuesta: [
            { texto: "Geralt de Rivia", correcta: true },
            { texto: "Vesemir", correcta: false },
            { texto: "Triss Merigold", correcta: false },
            { texto: "Dandelion", correcta: false },
        ]
    }
];

// Variables globales
const preguntaElemento = document.getElementById('pregunta');
const botonesRespuesta = document.getElementById('botones_respuesta');
const botonSiguiente = document.getElementById('boton_siguiente');
const timerElemento = document.getElementById('timer');

const inicioTiempo = 5; 
const TOTAL_PREGUNTAS_QUIZ = 10; // Número de preguntas por quiz

let indicePreguntaActual = 0;
let puntaje = 0;
let tiempoRestante = inicioTiempo * 60;
let timerInterval;
let preguntasSeleccionadas = []; // Array que contendrá las 10 preguntas aleatorias

//  FUNCIÓN PARA SELECCIONAR PREGUNTAS ALEATORIAS 
function seleccionarPreguntasAleatorias() {
    // Crear una copia del banco completo para no modificar el original
    const preguntasDisponibles = [...bancoPreguntasCompleto];
    const preguntasElegidas = [];
    
    // Seleccionar 10 preguntas aleatorias sin repetición
    for (let i = 0; i < TOTAL_PREGUNTAS_QUIZ; i++) {
        const indiceAleatorio = Math.floor(Math.random() * preguntasDisponibles.length);
        const preguntaSeleccionada = preguntasDisponibles.splice(indiceAleatorio, 1)[0];
        preguntasElegidas.push(preguntaSeleccionada);
    }
    
    return preguntasElegidas;
}

//  FUNCIONES PARA LOCALSTORAGE 
function guardarPuntaje(usuario, puntaje) {
    const fecha = new Date().toLocaleDateString('es-ES');
    const tiempo = new Date().toLocaleTimeString('es-ES');
    const nuevoPuntaje = {
        nombre: usuario,
        puntaje: puntaje,
        fecha: fecha,
        hora: tiempo,
        total: TOTAL_PREGUNTAS_QUIZ,
        timestamp: Date.now()
    };
    
    let puntajes = JSON.parse(localStorage.getItem('gamingQuizPuntajes')) || [];
    puntajes.push(nuevoPuntaje);
    localStorage.setItem('gamingQuizPuntajes', JSON.stringify(puntajes));
    
    console.log('Puntaje guardado:', nuevoPuntaje);
    console.log('Total de puntajes:', puntajes.length);
}

function obtenerTopPuntajes() {
    const puntajes = JSON.parse(localStorage.getItem('gamingQuizPuntajes')) || [];
    const usuariosMap = new Map();
    
    puntajes.forEach(puntaje => {
        const usuario = puntaje.nombre;
        if (!usuariosMap.has(usuario) || usuariosMap.get(usuario).puntaje < puntaje.puntaje) {
            usuariosMap.set(usuario, puntaje);
        }
    });
    
    return Array.from(usuariosMap.values())
        .sort((a, b) => b.puntaje - a.puntaje)
        .slice(0, 5);
}

//  FUNCIONES DEL QUIZ 
function iniciarQuiz() {
    // Seleccionar preguntas aleatorias al inicio de cada quiz
    preguntasSeleccionadas = seleccionarPreguntasAleatorias();
    
    console.log('Preguntas seleccionadas para este quiz:', preguntasSeleccionadas.map(p => p.pregunta));
    
    // Resetear variables
    indicePreguntaActual = 0;
    puntaje = 0;
    tiempoRestante = inicioTiempo * 60;
    botonSiguiente.innerHTML = "Siguiente";
    
    // Iniciar quiz
    mostrarPregunta();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(actualizarTiempo, 1000);
}

function mostrarPregunta() {
    resetState();
    
    // Usar las preguntas seleccionadas aleatoriamente
    let preguntaActual = preguntasSeleccionadas[indicePreguntaActual];
    let numeroPregunta = indicePreguntaActual + 1;
    preguntaElemento.innerHTML = numeroPregunta + ". " + preguntaActual.pregunta;

    preguntaActual.respuesta.forEach(respuesta => { 
        const button = document.createElement('button');
        button.innerHTML = respuesta.texto;
        button.classList.add('btn');
        botonesRespuesta.appendChild(button);
        if (respuesta.correcta) {
            button.dataset.correct = respuesta.correcta;
        }
        button.addEventListener("click", seleccionarRespuesta);
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
    if (indicePreguntaActual < preguntasSeleccionadas.length) {
        mostrarPregunta();
    } else {
        mostrarPuntaje();
    }
}

function mostrarPuntaje() {
    resetState();
    
    const usuario = localStorage.getItem("usuario") || "Desconocido";
    guardarPuntaje(usuario, puntaje);

    preguntaElemento.innerHTML = `¡Quiz terminado!<br><br>
        <strong>${usuario}</strong>, tu puntaje es:<br>
        <span style="font-size:2em">${puntaje} / ${TOTAL_PREGUNTAS_QUIZ}</span>`;

    const botonesContainer = document.createElement('div');
    botonesContainer.style.cssText = `
        display: flex;
        gap: 20px;
        justify-content: center;
        margin-top: 30px;
        flex-wrap: wrap;
    `;

    const botonNuevoQuiz = document.createElement('button');
    botonNuevoQuiz.innerHTML = "🔄 Nuevo Quiz";
    botonNuevoQuiz.style.cssText = `
        background: #0ecc0e;
        color: white;
        font-weight: 600;
        padding: 12px 20px;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s;
    `;
    botonNuevoQuiz.onmouseover = () => botonNuevoQuiz.style.background = '#0ba80b';
    botonNuevoQuiz.onmouseout = () => botonNuevoQuiz.style.background = '#0ecc0e';
    botonNuevoQuiz.onclick = function() {
        iniciarQuiz();
    };

    const botonMenu = document.createElement('button');
    botonMenu.innerHTML = "🏠 Volver al Menú";
    botonMenu.style.cssText = `
        background: #631414;
        color: white;
        font-weight: 600;
        padding: 12px 20px;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s;
    `;
    botonMenu.onmouseover = () => botonMenu.style.background = '#a83232';
    botonMenu.onmouseout = () => botonMenu.style.background = '#631414';
    botonMenu.onclick = function() {
        window.location.href = "../Login/index.html";
    };

    botonesContainer.appendChild(botonNuevoQuiz);
    botonesContainer.appendChild(botonMenu);
    preguntaElemento.parentNode.appendChild(botonesContainer);

    botonSiguiente.style.display = "none";
    
    if (timerInterval) clearInterval(timerInterval);
}

function actualizarTiempo() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    timerElemento.innerHTML = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    
    if (tiempoRestante === 0) {
        clearInterval(timerInterval);
        mostrarPuntaje();
    } else {
        tiempoRestante--;
    }
}

// Event listener para el botón siguiente
botonSiguiente.addEventListener("click", siguientePregunta);

// Iniciar el quiz con preguntas aleatorias
iniciarQuiz();


