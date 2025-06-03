document.addEventListener("DOMContentLoaded", function() {
    // - ELEMENTOS DEL DOM 
    const checkbox = document.getElementById("mostrar-contraseña");
    const inputPassword = document.getElementById("contraseña");
    const inputUsuario = document.getElementById("usuario");
    const loginForm = document.getElementById("loginForm");
    const crearNuevoUsuarioCheckbox = document.getElementById("crear-nuevo-usuario");
    
    // Pantallas
    const loginScreen = document.getElementById("loginScreen");
    const menuScreen = document.getElementById("menuScreen");
    const scoresScreen = document.getElementById("scoresScreen");
    const loadingOverlay = document.getElementById("loadingOverlay");
    
    // Elementos del menú
    const welcomeUser = document.getElementById("welcomeUser");
    const iniciarQuizBtn = document.getElementById("iniciarQuizBtn");
    const verPuntajesBtn = document.getElementById("verPuntajesBtn");
    const cambiarUsuarioBtn = document.getElementById("cambiarUsuarioBtn");
    const volverMenuBtn = document.getElementById("volverMenuBtn");
    const limpiarPuntajesBtn = document.getElementById("limpiarPuntajesBtn");

    // - EVENT LISTENERS -
    checkbox.addEventListener("change", togglePasswordVisibility);
    loginForm.addEventListener("submit", handleLogin);
    iniciarQuizBtn.addEventListener("click", iniciarQuiz);
    verPuntajesBtn.addEventListener("click", mostrarPuntajesDetallados);
    cambiarUsuarioBtn.addEventListener("click", volverAlLogin);
    volverMenuBtn.addEventListener("click", volverAlMenu);
    limpiarPuntajesBtn.addEventListener("click", limpiarTodosPuntajes);
    
    // - INICIALIZACIÓN -
    cargarTopPuntajes();
    
    // Verificar si ya hay usuario logueado
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
        mostrarMenu(usuarioGuardado);
    }

    //  FUNCIONES DE NAVEGACIÓN 
    function mostrarPantalla(pantallaActiva) {
        const pantallas = [loginScreen, menuScreen, scoresScreen];
        
        pantallas.forEach(pantalla => {
            if (pantalla === pantallaActiva) {
                pantalla.classList.remove('hidden');
                pantalla.classList.add('active');
            } else {
                pantalla.classList.remove('active');
                pantalla.classList.add('hidden');
            }
        });
    }

    function mostrarCarga(mostrar = true, mensaje = "Preparando el quiz...") {
        if (mostrar) {
            loadingOverlay.classList.remove('hidden');
            loadingOverlay.querySelector('p').textContent = mensaje;
        } else {
            loadingOverlay.classList.add('hidden');
        }
    }

    //  FUNCIONES DE LOGIN 
    function togglePasswordVisibility() {
        inputPassword.type = checkbox.checked ? "text" : "password";
    }

    function camposCompletos() {
        return inputUsuario.value.trim() !== "" && inputPassword.value.trim() !== "";
    }

    function handleLogin(e) {
        e.preventDefault();

        if (!camposCompletos()) {
            alert("Por favor, completa ambos campos para iniciar sesión.");
            return;
        }

        const usuario = inputUsuario.value.trim();
        const contraseña = inputPassword.value.trim();

        if (crearNuevoUsuarioCheckbox.checked) {
            // Registro de nuevo usuario
            if (usuarioExiste(usuario)) {
                alert("Ese nombre de usuario ya existe. Elige otro.");
                return;
            }
            registrarUsuario(usuario, contraseña);
            alert("Usuario creado exitosamente. Ahora puedes iniciar sesión.");
            crearNuevoUsuarioCheckbox.checked = false;
            inputUsuario.value = "";
            inputPassword.value = "";
            return;
        } else {
            // Validación de login
            if (!usuarioExiste(usuario)) {
                alert("El usuario no existe. Marca 'Crear nuevo usuario' para registrarte.");
                return;
            }
            if (!validarCredenciales(usuario, contraseña)) {
                alert("Contraseña incorrecta.");
                return;
            }
        }

        mostrarCarga(true, "Validando credenciales...");

        setTimeout(() => {
            // Guardar usuario logueado
            localStorage.setItem("usuario", usuario);
            mostrarCarga(false);
            mostrarMenu(usuario);
        }, 1000);
    }

    function mostrarMenu(usuario) {
        welcomeUser.textContent = usuario;
        cargarTopPuntajes(); // Actualizar puntajes
        mostrarPantalla(menuScreen);
    }

    function volverAlLogin() {
        // Limpiar campos
        inputUsuario.value = "";
        inputPassword.value = "";
        checkbox.checked = false;
        togglePasswordVisibility();
        mostrarPantalla(loginScreen);
    }

    //  FUNCIONES DEL QUIZ 
    function iniciarQuiz() {
        mostrarCarga(true, "Iniciando Gaming Quiz...");
        
        setTimeout(() => {
            window.location.href = "Quiz/quiz.html";
        }, 1000);
    }

    //  FUNCIONES DE PUNTAJES
    function cargarTopPuntajes() {
        const puntajes = JSON.parse(localStorage.getItem('gamingQuizPuntajes')) || [];
        const scoresTable = document.getElementById('scoresTable');
        
        if (puntajes.length === 0) {
            scoresTable.innerHTML = '<div class="no-scores">No hay puntajes registrados aún.<br>¡Sé el primero en jugar!</div>';
            return;
        }

        const mejoresPuntajes = agruparPorUsuario(puntajes);

        let html = '';
        mejoresPuntajes.forEach((puntaje, index) => {
            const ranking = index + 1;
            const porcentaje = Math.round((puntaje.puntaje / puntaje.total) * 100);
            
            html += `
                <div class="score-item">
                    <div class="score-rank">#${ranking}</div>
                    <div class="score-info">
                        <div class="score-name">${puntaje.nombre}</div>
                        <div class="score-details">${puntaje.fecha} • ${porcentaje}%</div>
                    </div>
                    <div class="score-points">${puntaje.puntaje}/${puntaje.total}</div>
                </div>
            `;
        });
        
        scoresTable.innerHTML = html;
    }

    function mostrarPuntajesDetallados() {
        const puntajes = JSON.parse(localStorage.getItem('gamingQuizPuntajes')) || [];
        const detailedScores = document.getElementById('detailedScores');
        
        if (puntajes.length === 0) {
            detailedScores.innerHTML = '<div class="no-scores">No hay puntajes registrados.</div>';
        } else {
            // Ordenar por fecha y hora (más reciente primero)
            const puntajesOrdenados = puntajes.sort((a, b) => b.timestamp - a.timestamp);
            
            let html = '';
            puntajesOrdenados.forEach((puntaje, index) => {
                const porcentaje = Math.round((puntaje.puntaje / puntaje.total) * 100);
                
                html += `
                    <div class="detailed-score-item">
                        <div class="score-user-info">
                            <h4>${puntaje.nombre}</h4>
                            <div class="score-meta">${puntaje.fecha} • ${puntaje.hora}</div>
                        </div>
                        <div class="score-result">
                            <div class="score-percentage">${porcentaje}%</div>
                            <div class="score-fraction">${puntaje.puntaje}/${puntaje.total}</div>
                        </div>
                    </div>
                `;
            });
            
            detailedScores.innerHTML = html;
        }
        
        mostrarPantalla(scoresScreen);
    }

    function volverAlMenu() {
        cargarTopPuntajes(); // Actualizar puntajes por si hay cambios
        mostrarPantalla(menuScreen);
    }

    function limpiarTodosPuntajes() {
        const confirmacion = confirm(
            "⚠️ ¿Estás seguro de que quieres eliminar TODOS los puntajes?\n\n" +
            "Esta acción no se puede deshacer."
        );
        
        if (confirmacion) {
            localStorage.removeItem('gamingQuizPuntajes');
            
            // Actualizar ambas vistas
            cargarTopPuntajes();
            mostrarPuntajesDetallados();
            
            alert("✅ Todos los puntajes han sido eliminados.");
        }
    }

    // FUNCIONES DE USUARIOS
    function obtenerUsuarios() {
        return JSON.parse(localStorage.getItem("usuariosQuiz")) || [];
    }

    function guardarUsuarios(usuarios) {
        localStorage.setItem("usuariosQuiz", JSON.stringify(usuarios));
    }

    function registrarUsuario(usuario, contraseña) {
        const usuarios = obtenerUsuarios();
        usuarios.push({ usuario, contraseña });
        guardarUsuarios(usuarios);
    }

    function usuarioExiste(usuario) {
        const usuarios = obtenerUsuarios();
        return usuarios.some(u => u.usuario === usuario);
    }

    function validarCredenciales(usuario, contraseña) {
        const usuarios = obtenerUsuarios();
        return usuarios.some(u => u.usuario === usuario && u.contraseña === contraseña);
    }

    // FUNCIÓN AUXILIAR
    function agruparPorUsuario(puntajes) {
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
});