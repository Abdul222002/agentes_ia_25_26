// ELEMENTOS DEL DOM
const selectTema = document.getElementById("tema-select");
const inputNum = document.getElementById("num-preguntas");
const btnGenerar = document.getElementById("generar-btn");
const btnLimpiar = document.getElementById("limpiar-btn");
const contPreguntas = document.getElementById("preguntas-container");
const loading = document.getElementById("loading");

// -------------------------
// Cargar temas al iniciar
// -------------------------
window.addEventListener("DOMContentLoaded", cargarTemas);

// -------------------------
// FUNCIÓN: cargarTemas()
// GET → /api/temas
// -------------------------
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

// -------------------------
// FUNCIÓN: generarPreguntas()
// POST → /api/generate
// -------------------------
async function generarPreguntas() {
  const tema = selectTema.value;
  const num = parseInt(inputNum.value);

  // Validaciones
  if (!tema) return mostrarError("Selecciona un tema para continuar.");
  if (isNaN(num) || num < 1 || num > 5)
    return mostrarError("El número de preguntas debe estar entre 1 y 5.");

  mostrarCarga(true);

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tema, numPreguntas: num })
    });

    if (!res.ok) throw new Error("Error al generar preguntas.");

    const data = await res.json();
    mostrarPreguntas(data.preguntas);

  } catch (err) {
    mostrarError("No se pudieron generar las preguntas.");
    console.error(err);
  } finally {
    mostrarCarga(false);
  }
}

// -------------------------
// FUNCIÓN: mostrarPreguntas(preguntas)
// -------------------------
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
      ${p.opciones ? generarOpcionesHTML(p.opciones) : ""}
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
function generarOpcionesHTML(opciones) {
  return `
    <ul>
      ${opciones.map(o => `<li>${o}</li>`).join("")}
    </ul>
  `;
}

// -------------------------
// FUNCIÓN: eliminarPregunta(id)
// DELETE → /api/preguntas/{id}
// -------------------------
async function eliminarPregunta(id) {
  try {
    const res = await fetch(`/api/preguntas/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar la pregunta.");

    alert("Pregunta eliminada.");
    generarPreguntas(); // recargar

  } catch (err) {
    mostrarError("No se pudo eliminar la pregunta.");
    console.error(err);
  }
}

// -------------------------
// FUNCIÓN: limpiar()
// DELETE opcional por tema
// -------------------------
async function limpiar() {
  contPreguntas.innerHTML = "";
  inputNum.value = "1";
  selectTema.value = "";

  // Si se desea limpiar preguntas del tema actual:
  /*
  if (selectTema.value) {
    try {
      await fetch(`/api/preguntas/tema/${selectTema.value}`, { method: "DELETE" });
    } catch (err) {
      console.error("Error limpiando preguntas del tema.");
    }
  }
  */
}

// -------------------------
// INDICADOR DE CARGA
// -------------------------
function mostrarCarga(estado) {
  loading.hidden = !estado;
  btnGenerar.disabled = estado;
}

// -------------------------
// MENSAJES DE ERROR
// -------------------------
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

// -------------------------
// EVENT LISTENERS
// -------------------------
btnGenerar.addEventListener("click", generarPreguntas);
btnLimpiar.addEventListener("click", limpiar);
selectTema.addEventListener("change", () => {
  // opcional: cargar preguntas del tema
});
inputNum.addEventListener("input", () => {
  const n = parseInt(inputNum.value);
  if (n < 1 || n > 5) inputNum.setCustomValidity("Debe ser entre 1 y 5");
  else inputNum.setCustomValidity("");
});
