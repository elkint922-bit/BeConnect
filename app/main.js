document.addEventListener("DOMContentLoaded", () => {
  // BOTONES DE ACCESIBILIDAD
  const btnAumentar = document.querySelector("#aumentarFuente");
  const btnDisminuir = document.querySelector("#disminuirFuente");
  const btnContraste = document.querySelector("#contraste");

  let tamañoFuente = 16;
  let contrasteActivo = false;

  if (btnAumentar && btnDisminuir && btnContraste) {
    btnAumentar.addEventListener("click", () => {
      if (tamañoFuente < 25) {
        tamañoFuente += 1;
        document.body.style.fontSize = `${tamañoFuente}px`;

        document.querySelectorAll("label").forEach(label => {
          let fontSize = parseFloat(window.getComputedStyle(label).fontSize);
          if (fontSize <= 24) {
            label.style.fontSize = (fontSize + 1) + "px";
          }
        });
      }
    });

    btnDisminuir.addEventListener("click", () => {
      if (tamañoFuente >= 12) {
        tamañoFuente -= 1;
        document.body.style.fontSize = `${tamañoFuente}px`;

        document.querySelectorAll("label").forEach(label => {
          let fontSize = parseFloat(window.getComputedStyle(label).fontSize);
          if (fontSize >= 12) {
            label.style.fontSize = (fontSize - 1) + "px";
          }
        });
      }
    });

    btnContraste.addEventListener("click", () => {
      contrasteActivo = !contrasteActivo;
      document.body.classList.toggle("modo-contraste", contrasteActivo);
    });
  }

  

async function buscarUbicacion() {
  const inputZona = document.getElementById("zona");
  const resultado = document.getElementById("resultado-ubicacion");

  if (!inputZona || !resultado) return;

  const consulta = inputZona.value.trim();

  if (consulta === "") {
    resultado.innerHTML = "<p>Por favor ingresa una zona o localidad.</p>";
    return;
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(consulta)}`;

  try {
    resultado.innerHTML = "<p>Buscando ubicación...</p>";

    const respuesta = await fetch(url, {
      headers: {
        "Accept-Language": "es"
      }
    });

    const datos = await respuesta.json();

    if (datos.length === 0) {
      resultado.innerHTML = "<p>No se encontraron resultados para esa ubicación.</p>";
      return;
    }

    const lugar = datos[0];
    const lat = Number(lugar.lat);
    const lon = Number(lugar.lon);

    resultado.innerHTML = `
      <div class="ubicacion-ok">
        <p><strong>Ubicación encontrada:</strong> ${lugar.display_name}</p>

        <div class="mini-mapa">
          <iframe
            width="100%"
            height="250"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01}%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}">
          </iframe>
        </div>
      </div>
    `;
  } catch (error) {
    console.log("Error al buscar ubicación:", error);
    resultado.innerHTML = "<p>Ocurrió un error al consultar la ubicación.</p>";
  }
}
// BOTÓN PARA BUSCAR UBICACIÓN
  const botonUbicacion = document.getElementById("buscar-ubicacion");
  if (botonUbicacion) {
    botonUbicacion.addEventListener("click", buscarUbicacion);
  }
});

/*Migas de pan*/
function actualizarMigasPan() {
  const breadcrumb = document.getElementById("breadcrumb");
  if (!breadcrumb) return;

  const hash = window.location.hash || "#inicio";

  const nombres = {
    "#inicio": "Inicio",
    "#servicios": "Servicios",
    "#solicitar": "Solicitar servicio",
    "#ofrecer": "Ofrecer servicio",
    "#acerca": "Acerca de",
    "#contacto": "Contacto",
    "#documento": "Documento"
  };

  const nombreActual = nombres[hash] || "Inicio";

  if (hash === "#inicio") {
    breadcrumb.innerHTML = `<a href="#inicio">Inicio</a> <span>></span> <span>Inicio</span>`;
  } else {
    breadcrumb.innerHTML = `<a href="#inicio">Inicio</a> <span>></span> <span>${nombreActual}</span>`;
  }
}

window.addEventListener("hashchange", actualizarMigasPan);
document.addEventListener("DOMContentLoaded", actualizarMigasPan);


/*Expresiones regulares*/
document.addEventListener("DOMContentLoaded", () => {
  const formularioSolicitar = document.querySelector('#solicitar form');

  if (formularioSolicitar) {
    formularioSolicitar.addEventListener("submit", (e) => {
      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const telefono = document.getElementById("telefono").value.trim();

      const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;
      const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const regexTelefono = /^[0-9]{7,10}$/;

      if (!regexNombre.test(nombre)) {
        alert("El nombre solo debe contener letras y espacios.");
        e.preventDefault();
        return;
      }

      if (!regexCorreo.test(correo)) {
        alert("Ingresa un correo electrónico válido.");
        e.preventDefault();
        return;
      }

      if (!regexTelefono.test(telefono)) {
        alert("El teléfono debe tener solo números y entre 7 y 10 dígitos.");
        e.preventDefault();
        return;
      }
    });
  }
});