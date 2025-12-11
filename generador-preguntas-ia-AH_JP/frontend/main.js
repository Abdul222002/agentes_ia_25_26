// DOM
const selectTema = document.getElementById("tema-select");
const inputNum = document.getElementById("num-preguntas");
const btnGenerar = document.getElementById("generar-btn");
const btnLimpiar = document.getElementById("limpiar-btn");
const contPreguntas = document.getElementById("preguntas-container");
const statusContainer = document.getElementById("status-container");

// Cargar temas al iniciar
window.addEventListener("DOMContentLoaded", cargarTemas);

/**
 * @author Juan Pérez Medina 
 * @description Carga la lista de temas desde la API y los inserta en el selector del DOM.
 * @param {void} 
 * @returns {Promise<void>} - No retorna datos, solo modifica el DOM.
 * @throws {Error} - Lanza un error si la solicitud a la API falla.
 */
async function cargarTemas() {
  try {
    const res = await fetch("/api/temas");
    if (!res.ok) throw new Error("Error al obtener los temas");

    const temas = await res.json();

    // Limpiar y rellenar selector
    selectTema.innerHTML = `<option value="">-- Selecciona un tema --</option>`;
    temas.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t.id;
      opt.textContent = t.nombre;
      selectTema.appendChild(opt);
    });

  } catch (err) {
    mostrarError("No se pudieron cargar los temas.");
    console.error(err);
  }
}

/**
 * @author Juan Pérez Medina 
 * @description Genera preguntas según el tema seleccionado y la cantidad indicada, consultando la API.
 * @param {void}
 * @returns {Promise<void>} - No retorna datos, pero muestra las preguntas en pantalla.
 * @throws {Error} - Lanza un error si la API no puede generar las preguntas.
 */
async function generarPreguntas() {
  const tema = selectTema.value;
  const num = parseInt(inputNum.value);

  // Validaciones
  if (!tema) {
    return mostrarError("Selecciona un tema para continuar.")
  };
  if (isNaN(num) || num < 1 || num > 5) {
    return mostrarError("El número de preguntas debe estar entre 1 y 5.");
  }
  mostrarEstado(1);

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tema, numPreguntas: num })
    });

    if (!res.ok) throw new Error("Error al generar preguntas.");

    const data = await res.json();
    mostrarEstado(2);
    mostrarPreguntas(data.preguntas);

  } catch (err) {
    mostrarEstado(3, "No se pudieron generar las preguntas.");
    console.error(err);
  } finally {
    btnGenerar.disabled = false;
  }
}
/**
 * @author Juan Pérez Medina
 * @description Mostrar 
 */


/**
 * @author Juan Pérez Medina 
 * @description Muestra en pantalla una lista de preguntas dentro de contenedores dinámicos.
 * @param {Array} preguntas - Lista de objetos pregunta a renderizar.
 * @returns {void} - Solo modifica el DOM para mostrar preguntas.
 */
function mostrarPreguntas(preguntas = []) {
  contPreguntas.innerHTML = "";

  if (!preguntas.length) {
    contPreguntas.innerHTML = "<p>No hay preguntas para mostrar.</p>";
    return;
  }

  preguntas.forEach(p => {
    const card = document.createElement("div");
    card.className = "pregunta-card";

    card.innerHTML = `
      <h3>${p.pregunta}</h3>
      ${p.opciones ? generarOpcionesHTML(p.opciones, p.correcta) : ""}
      <button class="eliminar-btn" data-id="${p.id}">Eliminar</button>
    `;

    // evento eliminar
    card.querySelector(".eliminar-btn").addEventListener("click", () => {
      eliminarPregunta(p.id);
    });

    contPreguntas.appendChild(card);
  });
}

// Helper para opciones
function generarOpcionesHTML(opciones, correcta) {
  if (!Array.isArray(opciones)) return "<ul><li>Opciones no disponibles</li></ul>";

  console.log("Rendering options:", opciones);
  console.log("Correct answer raw:", correcta);

  return `
    <ul>
      ${opciones.map((o, index) => {
    let isCorrect = false;

    const strO = String(o).trim();
    const strC = String(correcta).trim();

    // 1. Coincidencia exacta (insensible a mayúsculas/espacios)
    if (strO.toLowerCase() === strC.toLowerCase()) {
      isCorrect = true;
    }

    // 2. Coincidencia por índice numérico (0, 1, 2, 3)
    if (!isCorrect && (strC == String(index))) {
      isCorrect = true;
    }

    // 3. Coincidencia por letra simple (a, b, c, d)
    if (!isCorrect && strC.length === 1 && /^[a-d]$/i.test(strC)) {
      const letterIndex = strC.toLowerCase().charCodeAt(0) - 97; // 'a' -> 0
      if (letterIndex === index) {
        isCorrect = true;
      }
    }

    // 4. Coincidencia por prefijo en la respuesta correcta (e.g., "a) Respuesta", "1. Respuesta")
    if (!isCorrect) {
      // Buscar patrón letra o número al inicio de 'correcta'
      const matchLetter = strC.match(/^([a-d])[\.\)]/i);
      if (matchLetter) {
        const letterIndex = matchLetter[1].toLowerCase().charCodeAt(0) - 97;
        if (letterIndex === index) isCorrect = true;
      }

      const matchNumber = strC.match(/^(\d+)[\.\)]/);
      if (matchNumber) {
        // Asumimos que si pone "1." se refiere al índice 0, "2." al índice 1...
        // O si es 0-indexed? Usualmente en listas es 1-based.
        const numIndex = parseInt(matchNumber[1]) - 1;
        if (numIndex === index) isCorrect = true;
      }
    }

    return `<li${isCorrect ? ' class="correct"' : ''}>${o}</li>`;
  }).join("")}
    </ul>
  `;
}

/**
 * @author Juan Pérez Medina 
 * @description Elimina una pregunta mediante una solicitud DELETE y actualiza la interfaz.
 * @param {number|string} id - ID de la pregunta a eliminar.
 * @returns {Promise<void>} - No retorna datos, solo actualiza el DOM.
 * @throws {Error} - Lanza un error si ocurre un problema al intentar eliminar la pregunta.
 */
async function eliminarPregunta(id) {
  try {
    const res = await fetch(`/api/preguntas/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar la pregunta.");
    alert("Pregunta eliminada.");

    // Eliminar del DOM
    const card = document.querySelector(`button[data-id="${id}"]`).closest('.pregunta-card');
    if (card) {
      card.remove();

      // Si no quedan preguntas, mostrar mensaje
      if (contPreguntas.children.length === 0) {
        contPreguntas.innerHTML = "<p>No hay preguntas para mostrar.</p>";
      }
    }

  } catch (err) {
    mostrarError("No se pudo eliminar la pregunta.");
    console.error(err);
  }
}

/**
 * @author Juan Pérez Medina 
 * @description Limpia el contenedor de preguntas y restablece los valores del formulario.
 * @param {void}
 * @returns {void} - Resetea los valores de la interfaz.
 */
async function limpiar() {
  contPreguntas.innerHTML = "";
  inputNum.value = "1";
  selectTema.value = "";
}

// GESTIÓN DE ESTADOS
function mostrarEstado(tipo, mensaje = "") {
  statusContainer.classList.remove("hidden");

  // Limpiar contenedor usando DOM
  while (statusContainer.firstChild) {
    statusContainer.removeChild(statusContainer.firstChild);
  }

  const wrapper = document.createElement("div");

  switch (tipo) {
    case 1: // Loading
      wrapper.className = "status-loading";

      const spinner = document.createElement("div");
      spinner.className = "spinner";
      spinner.textContent = "⌛";

      const loadingText = document.createElement("span");
      loadingText.textContent = "Generando...";

      wrapper.appendChild(spinner);
      wrapper.appendChild(loadingText);

      btnGenerar.disabled = true;
      break;

    case 2: // Success
      wrapper.className = "status-success";

      const successText = document.createElement("span");
      successText.textContent = "✅ Generado correctamente";

      wrapper.appendChild(successText);

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        if (statusContainer.contains(wrapper)) {
          statusContainer.classList.add("hidden");
        }
      }, 3000);
      break;

    case 3: // Error
      wrapper.className = "status-error";

      const errorText = document.createElement("span");
      errorText.textContent = `❌ ${mensaje || "Ha ocurrido un error"}`;

      wrapper.appendChild(errorText);
      break;

    default:
      statusContainer.classList.add("hidden");
      return;
  }

  statusContainer.appendChild(wrapper);
}

// MENSAJES DE ERROR
function mostrarError(msg) {
  // Eliminar errores previos
  removeErrors();

  const error = document.createElement("div");
  error.className = "error-msg";
  error.innerHTML = `<span class="error-icon">⚠</span> ${msg}`;
  contPreguntas.prepend(error);

  // Auto-ocultar en 4s
  setTimeout(removeErrors, 4000);
}

function removeErrors() {
  document.querySelectorAll(".error-msg").forEach(e => e.remove());
}

// EVENT LISTENERS
btnGenerar.addEventListener("click", generarPreguntas);
btnLimpiar.addEventListener("click", limpiar);
inputNum.addEventListener("input", () => {
  const n = parseInt(inputNum.value);
  if (n < 1 || n > 5) {
    inputNum.setCustomValidity("Debe ser entre 1 y 5");
  } else {
    inputNum.setCustomValidity("")
  };
});
