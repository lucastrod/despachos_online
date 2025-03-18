// Función para cargar el contenido completo de una página desde un archivo HTML
function loadPage(page) {
  const contentDiv = document.getElementById("content");

  // Construir la URL del archivo HTML (asumiendo que los archivos HTML están en la misma carpeta)
  const filePath = `http://localhost:3000/pages/${page}.html`;

  // Usamos fetch para cargar el archivo HTML
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar la página");
      }
      return response.text();
    })
    .then((html) => {
      contentDiv.innerHTML = html; // Insertar el contenido HTML cargado en el contenedor

      // Cargar dinámicamente el script de la página si es necesario

      loadScript(`/js/${page}.js`);
    })
    .catch((error) => {
      contentDiv.innerHTML = `<h1>Error al cargar la página</h1><p>${error.message}</p>`;
    });
}

// Configurar los enlaces del menú
document.querySelectorAll("div.sidebar a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    // Remueve 'active' de todos los enlaces
    document.querySelectorAll("div.sidebar a").forEach((el) => {
      el.classList.remove("active");
    });

    // Agrega 'active' solo al enlace clickeado
    event.currentTarget.classList.add("active");

    // Obtiene la página y carga el contenido
    const page = event.currentTarget.getAttribute("data-page");
    loadPage(page);
  });
});

// Función para cargar scripts dinámicamente
function loadScript(src) {
  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  document.body.appendChild(script);
}

// Cargar la página inicial por defecto
window.addEventListener("load", () => loadPage("scan"));
