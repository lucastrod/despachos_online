(function () {
  // Datos simulados de paquetes (puedes reemplazarlo con datos de un API)
  let paquetes = [];

  let paquetesFiltrados = [...paquetes]; // Copia de los paquetes originales
  let itemsPorPagina = 10;
  let paginaActual = 1;

  fetch("/src/paquetes.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json();
    })
    .then((data) => {
      paquetes = data;
      paquetesFiltrados = [...paquetes]; // Copia de los paquetes originales
      renderizarTabla(); // Renderizar la tabla después de cargar los paquetes
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  function buscarPaquetes(query) {
    query = query.toLowerCase();
    paquetesFiltrados = paquetes.filter(
      (p) =>
        p.guia.toLowerCase().includes(query) ||
        p.estado.toLowerCase().includes(query) ||
        p.destino.toLowerCase().includes(query)
    );
    paginaActual = 1;
    renderizarTabla();
  }

  function aplicarFiltros() {
    const peso = document.getElementById("pesoFilter").value;
    const tamano = document.getElementById("tamanoFilter").value;
    itemsPorPagina = parseInt(document.getElementById("cantidadFilter").value);

    paquetesFiltrados = paquetes.filter((p) => {
      return (
        (peso === "" ||
          (peso === "more" ? p.peso > 10 : p.peso <= parseInt(peso))) &&
        (tamano === "" || p.tamano === tamano)
      );
    });

    paginaActual = 1;
    renderizarTabla();
  }

  function limpiarFiltros() {
    document.getElementById("pesoFilter").value = "";
    document.getElementById("tamanoFilter").value = "";
    document.getElementById("cantidadFilter").value = "10";

    paquetesFiltrados = [...paquetes];
    paginaActual = 1;
    renderizarTabla();
  }

  function cambiarPagina(nuevaPagina) {
    paginaActual = nuevaPagina;
    renderizarTabla();
  }

  function renderizarTabla() {
    const tabla = document.getElementById("tablaPaquetes");
    tabla.innerHTML = "";

    const inicio = (paginaActual - 1) * itemsPorPagina;
    const paquetesPagina = paquetesFiltrados.slice(
      inicio,
      inicio + itemsPorPagina
    );

    paquetesPagina.forEach((p) => {
      const row = `<tr>
          <td>${p.id}</td>
          <td>${p.guia}</td>
          <td>${p.peso} kg</td>
          <td>${p.tamano}</td>
          <td>${p.estado}</td>
          <td>${p.destino}</td>
          <td>${p.fecha}</td>
          <td><button class="btn btn-primary btn-sm">Ver</button></td>
        </tr>`;
      tabla.innerHTML += row;
    });

    renderizarPaginacion();
  }

  function renderizarPaginacion() {
    const paginacion = document.getElementById("paginacion");
    paginacion.innerHTML = "";

    const totalPaginas = Math.ceil(paquetesFiltrados.length / itemsPorPagina);
    for (let i = 1; i <= totalPaginas; i++) {
      const li = document.createElement("li");
      li.classList.add("page-item");
      if (i === paginaActual) li.classList.add("active");

      const a = document.createElement("a");
      a.classList.add("page-link");
      a.textContent = i;
      a.href = "#";
      a.addEventListener("click", (e) => {
        e.preventDefault();
        cambiarPagina(i);
      });

      li.appendChild(a);
      paginacion.appendChild(li);
    }
  }

  // Renderizar la tabla al cargar la página
  renderizarTabla();

  // Asignar eventos a los filtros
  document
    .getElementById("searchInput")
    .addEventListener("keyup", (e) => buscarPaquetes(e.target.value));
  document
    .getElementById("pesoFilter")
    .addEventListener("change", aplicarFiltros);
  document
    .getElementById("tamanoFilter")
    .addEventListener("change", aplicarFiltros);
  document
    .getElementById("cantidadFilter")
    .addEventListener("change", aplicarFiltros);
  document
    .querySelector(".btn-secondary")
    .addEventListener("click", limpiarFiltros);
  document
    .getElementById("toggleFilters")
    .addEventListener("click", function () {
      let filterContainer = document.getElementById("filterContainer");
      filterContainer.classList.toggle("d-none"); // Alterna la visibilidad de la card
    });
})();
