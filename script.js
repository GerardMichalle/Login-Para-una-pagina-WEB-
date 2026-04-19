document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll("form");
  const container = document.querySelector(".container");
  const btnSignIn = document.getElementById("btn-sign-in");
  const btnSignUp = document.getElementById("btn-sign-up");

  // Título original
  const tituloOriginal = document.title;

  // Favicon
  const favicon = document.querySelector("link[rel='icon']");
  const iconoOriginal = favicon.href;

  // 🔥 UN SOLO visibilitychange
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.title = "Vuelve 💚";
      favicon.href = "background/hoja_tite.png";
    } else {
      document.title = tituloOriginal;
      favicon.href = iconoOriginal;
    }
  });

  // 🔥 FUNCIÓN REUTILIZABLE PARA PLACEHOLDER
  function animarInput(selector, textos) {
    const input = document.querySelector(selector);

    let i = 0;
    let j = 0;
    let escribiendo = true;

    function efecto() {
      const texto = textos[i];

      if (escribiendo) {
        input.setAttribute("placeholder", texto.substring(0, j + 1));
        j++;

        if (j === texto.length) {
          escribiendo = false;
          setTimeout(efecto, 1500);
          return;
        }

      } else {
        input.setAttribute("placeholder", texto.substring(0, j - 1));
        j--;

        if (j === 0) {
          escribiendo = true;
          i = (i + 1) % textos.length;
        }
      }

      setTimeout(efecto, escribiendo ? 80 : 40);
    }

    // detener cuando el usuario escribe
    input.addEventListener("focus", () => {
      input.setAttribute("placeholder", "");
    });

    efecto();
  }

  // 🔥 Aplicar a todos los inputs
  animarInput(".user", [
    "Ingresa tu email",
    "example@gmail.com"
  ]);
  

  animarInput(".password", [
    "Ingresa tu contraseña",
    "••••••••"
  ]);
   animarInput(".password2", [
    "Ingresa tu contraseña",
    "••••••••"
  ]);

  animarInput(".username", [
    "Crea un usuario",
    "Ej: Gerard123"
  ]);
  animarInput(".user2", [
    "Ingresa tu email",
    "example@gmail.com"
  ]);
  // Botones cambiar panel
  btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
  });

  btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
  });

  // Validación formularios
  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input");
    const button = form.querySelector(".button");

    button.disabled = true;
    button.style.opacity = "0.5";
    button.style.cursor = "not-allowed";

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        let allFilled = true;

        inputs.forEach((i) => {
          if (i.value.trim() === "") {
            allFilled = false;
          }
        });

        button.disabled = !allFilled;
        button.style.opacity = allFilled ? "1" : "0.5";
        button.style.cursor = allFilled ? "pointer" : "not-allowed";
      });
    });

    form.addEventListener("submit", (e) => {
      let allFilled = true;

      inputs.forEach((i) => {
        if (i.value.trim() === "") {
          allFilled = false;
        }
      });

      if (!allFilled) e.preventDefault();
    });
  });

});