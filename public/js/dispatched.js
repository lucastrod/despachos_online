(function () {
  // Datos simulados de paquetes (puedes reemplazarlo con datos de un API)
  let paquetes = [];
  let paquetesFiltrados = [...paquetes]; // Copia de los paquetes originales
  let itemsPorPagina = 10;
  let paginaActual = 1;

  fetch("/src/dispatched.json")
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
    const estado = document.getElementById("estadoFilter").value;
    itemsPorPagina = parseInt(document.getElementById("cantidadFilter").value);

    // Filtrar paquetes según estado y cantidad por página
    paquetesFiltrados = paquetes.filter((p) => {
      return (
        estado === "" || p.estado === estado // Filtra por estado
      );
    });

    // Reiniciar la página actual a la primera página
    paginaActual = 1;

    // Renderizar la tabla con los paquetes filtrados
    renderizarTabla();
  }

  function limpiarFiltros() {
    // Restablecer valores de los filtros
    document.getElementById("estadoFilter").value = "";
    document.getElementById("cantidadFilter").value = "10";

    // Restablecer los paquetes filtrados a todos los paquetes disponibles
    paquetesFiltrados = [...paquetes];

    // Reiniciar la página actual a la primera página
    paginaActual = 1;

    // Renderizar la tabla con todos los paquetes
    renderizarTabla();
  }

  function cambiarPagina(nuevaPagina) {
    paginaActual = nuevaPagina;
    renderizarTabla();
  }

  function renderizarTabla() {
    const tabla = document.getElementById("tablaDespachos");
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
            <td>${p.destino}</td>
            <td>${p.fecha}</td>
            <td>${p.courier}</td>
            <td>${p.estado}</td>
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
    .getElementById("estadoFilter")
    .addEventListener("change", aplicarFiltros);
  document
    .getElementById("cantidadFilter")
    .addEventListener("change", aplicarFiltros);
  document
    .getElementById("limpiarFiltrosBtn")
    .addEventListener("click", limpiarFiltros);
  document
    .getElementById("toggleFilters2")
    .addEventListener("click", function () {
      let filterContainer = document.getElementById("filterContainer2");
      filterContainer.classList.toggle("d-none"); // Alterna la visibilidad de la card
    });
})();
