document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");
  const container = document.querySelector(".container");
  const btnSignIn = document.getElementById("btn-sign-in");
  const btnSignUp = document.getElementById("btn-sign-up");

  btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
  });

  btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
  });

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input");
    const button = form.querySelector(".button");

    // desactivar al inicio
    button.disabled = true;
    button.style.opacity = "0.5";
    button.style.cursor = "not-allowed";

    // escuchar cambios en inputs
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        let allFilled = true;

        inputs.forEach((i) => {
          if (i.value.trim() === "") {
            allFilled = false;
          }
        });

        if (allFilled) {
          button.disabled = false;
          button.style.opacity = "1";
          button.style.cursor = "pointer";
        } else {
          button.disabled = true;
          button.style.opacity = "0.5";
          button.style.cursor = "not-allowed";
        }
      });
    });

    // evitar submit si algo está vacío
    form.addEventListener("submit", (e) => {
      let allFilled = true;

      inputs.forEach((i) => {
        if (i.value.trim() === "") {
          allFilled = false;
        }
      });

      if (!allFilled) {
        e.preventDefault();
      }
    });
  });
});
