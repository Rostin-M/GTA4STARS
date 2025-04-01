document.addEventListener("DOMContentLoaded", function () {
    // Elementos de los formularios y botones de alternancia
    const loginFormContainer = document.querySelector(".login-form-container");
    const registerFormContainer = document.querySelector(".register-form-container");
    const loginForm = loginFormContainer.querySelector("form");
    const registerForm = registerFormContainer.querySelector("form");

    // Botones para abrir/cerrar formularios
    const loginBtn = document.getElementById("login-btn");
    const registerBtnFromLogin = document.getElementById("register-btn");
    const closeLoginBtn = document.getElementById("close-login-btn");
    const closeRegisterBtn = document.getElementById("close-register-btn");
    const openLoginFormLink = document.getElementById("open-login-form");

    // Funciones para mostrar u ocultar formularios
    const showLoginForm = () => {
        loginFormContainer.style.display = "flex";
        registerFormContainer.style.display = "none";
    };

    const showRegisterForm = () => {
        registerFormContainer.style.display = "flex";
        loginFormContainer.style.display = "none";
    };

    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            showLoginForm();
        });
    }

    if (registerBtnFromLogin) {
        registerBtnFromLogin.addEventListener("click", function () {
            showRegisterForm();
        });
    }

    // Cierra el formulario de inicio de sesión
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener("click", function () {
            loginFormContainer.style.display = "none";
        });
    }

    // Cierra el formulario de registro
    if (closeRegisterBtn) {
        closeRegisterBtn.addEventListener("click", function () {
            registerFormContainer.style.display = "none";
        });
    }

    // Alterna de vuelta al formulario de inicio de sesión desde el formulario de registro
    if (openLoginFormLink) {
        openLoginFormLink.addEventListener("click", function (event) {
            event.preventDefault();
            showLoginForm();
        });
    }

    // Manejo del formulario de registro
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener valores de los campos usando los placeholders
        const nombreCompleto = registerForm.querySelector("input[placeholder='Nombre Completo']").value.trim();
        const email = registerForm.querySelector("input[placeholder='Correo Electrónico']").value.trim();
        const password = registerForm.querySelector("input[placeholder='Contraseña']").value.trim();
        const confirmPassword = registerForm.querySelector("input[placeholder='Confirmar Contraseña']").value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validar campos vacíos
        if (!nombreCompleto || !email || !password || !confirmPassword) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Validar formato del correo
        if (!emailRegex.test(email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Guardar datos en localStorage
        const usuario = {
            nombreCompleto: nombreCompleto,
            email: email,
            password: password
        };
        localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));

        alert("Registro exitoso. Bienvenido " + nombreCompleto + "!");
        registerForm.reset();

        showLoginForm();
    });

    // Manejo del formulario de inicio de sesión
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener valores de los campos del login
        const email = loginForm.querySelector("input[placeholder='Correo Electrónico']").value.trim();
        const password = loginForm.querySelector("input[placeholder='Contraseña']").value.trim();

        // Validar campos vacíos
        if (!email || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Obtener datos del usuario registrado
        const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

        // Validar credenciales
        if (usuarioRegistrado && usuarioRegistrado.email === email && usuarioRegistrado.password === password) {
            alert("Inicio de sesión exitoso. Bienvenido " + usuarioRegistrado.nombreCompleto + "!");
            // Redirigir a la página principal
            window.location.href = "index.html";
        } else {
            alert("Correo electrónico o contraseña incorrectos.");
        }
    });
});
