document.addEventListener("DOMContentLoaded", function() {
    const checkbox = document.getElementById("mostrar-contraseña");
    const inputPassword = document.getElementById("contraseña");
    const inputUsuario = document.getElementById("usuario");
    const form = document.querySelector("form");

    checkbox.addEventListener("change", togglePasswordVisibility);
    form.addEventListener("submit", handleFormSubmit);

    function togglePasswordVisibility() {
        inputPassword.type = checkbox.checked ? "text" : "password";
    }

    function camposCompletos() {
        return inputUsuario.value.trim() !== "" && inputPassword.value.trim() !== "";
    } 


     function saveCredentials() {
        localStorage.setItem("usuario", inputUsuario.value);
        localStorage.setItem("contraseña", inputPassword.value);
    }

    function redirectToQuiz() {
        window.location.href = "../Quiz/quiz.html";
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (!camposCompletos()) {
            alert("Por favor, completa ambos campos para iniciar sesión.");
            return;
        }
        saveCredentials();
        redirectToQuiz();
    }
   
});


