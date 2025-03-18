let qrScanner;

async function abrirModalQR() {
  const modal = new bootstrap.Modal(document.getElementById("modalQR"));
  modal.show();

  qrScanner = new Html5Qrcode("qr-reader");
  await qrScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    (decodedText) => {
      cerrarQR();
      mostrarFormulario(decodedText);
    }
  );

  //asigna id al video del lector qr
  document.querySelector("#qr-reader video").id = "qr-video";
  //le quita los estilos por defecto
  document.getElementById("qr-video").style = "";
}

function cerrarQR() {
  if (qrScanner) {
    qrScanner.stop().then(() => {
      qrScanner.clear();
    });
  }
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalQR"));
  modal.hide();
}

function mostrarFormulario(data) {
  try {
    const jsonData = JSON.parse(data); // QR debe tener JSON válido

    document.getElementById("nombre").value = jsonData.nombre || "";
    document.getElementById("guia").value = jsonData.guia || "";
    document.getElementById("peso").value = jsonData.peso || "";
    document.getElementById("destino").value = jsonData.destino || "";
    document.getElementById("origen").value = jsonData.origen || "";
    document.getElementById("courier").value = jsonData.courier || "oca";

    const modal = new bootstrap.Modal(
      document.getElementById("modalFormulario")
    );
    modal.show();
  } catch (error) {
    alert("Error al leer el QR: formato inválido.");
  }
}

function habilitarEdicion() {
  document
    .querySelectorAll("#formDatos input, #formDatos select")
    .forEach((input) => {
      input.removeAttribute("disabled");
    });
}

async function enviarDatos() {
  const datos = {
    nombre: document.getElementById("nombre").value,
    guia: document.getElementById("guia").value,
    peso: document.getElementById("peso").value,
    destino: document.getElementById("destino").value,
    origen: document.getElementById("origen").value,
    courier: document.getElementById("courier").value,
  };

  try {
    const response = await fetch("TU_URL_API", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    if (response.ok) {
      alert("Datos enviados con éxito.");
    } else {
      alert("Error al enviar los datos.");
    }
  } catch (error) {
    alert("Error en la solicitud.");
  }
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalFormulario")
  );
  modal.hide();
}
