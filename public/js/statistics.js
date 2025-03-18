let grafico;
let datosIniciales = {
  fechas: [
    "2023-10-01",
    "2023-10-02",
    "2023-10-03",
    "2023-10-04",
    "2023-10-05",
    "2023-10-06",
    "2023-10-07",
  ],
  ingresados: [10, 15, 13, 17, 21, 19, 23],
  despachados: [8, 12, 10, 15, 18, 16, 20],
};

// Cargar datos al iniciar
window.onload = function () {
  inicializarGrafico();
};

// Función para inicializar el gráfico
function inicializarGrafico() {
  const ctx = document.getElementById("graficoLineas").getContext("2d");
  grafico = new Chart(ctx, {
    type: "line",
    data: {
      labels: datosIniciales.fechas,
      datasets: [
        {
          label: "Paquetes Ingresados",
          data: datosIniciales.ingresados,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
        {
          label: "Paquetes Despachados",
          data: datosIniciales.despachados,
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Función para actualizar el gráfico según los filtros
function actualizarGrafico() {
  const proveedor = document.getElementById("proveedorFilter").value;
  const tiempo = document.getElementById("tiempoFilter").value;
  const tipoDatos = document.getElementById("tipoDatosFilter").value;

  // Simulación de datos filtrados (deberías reemplazar esto con una llamada a la API)
  const datosFiltrados = filtrarDatos(proveedor, tiempo, tipoDatos);

  grafico.data.labels = datosFiltrados.fechas;
  grafico.data.datasets[0].data = datosFiltrados.ingresados;
  grafico.data.datasets[1].data = datosFiltrados.despachados;
  grafico.update();
}

// Función para simular el filtrado de datos (reemplazar con lógica real)
function filtrarDatos(proveedor, tiempo, tipoDatos) {
  // Simulación de datos filtrados
  return {
    fechas: datosIniciales.fechas.slice(-tiempo),
    ingresados: datosIniciales.ingresados.slice(-tiempo),
    despachados: datosIniciales.despachados.slice(-tiempo),
  };
}

// Función para limpiar filtros
function limpiarFiltros() {
  document.getElementById("proveedorFilter").value = "";
  document.getElementById("tiempoFilter").value = "7";
  document.getElementById("tipoDatosFilter").value = "ingresados";
  actualizarGrafico();
}
