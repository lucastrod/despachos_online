import axios from 'axios';

const EstadoInterno = {
  A_DESPACHAR: 'A DESPACHAR',
  DESPACHADO: 'DESPACHADO'
};

export class PackagesController {
    constructor(db) {
      this.db = db; // Recibe la conexión a la base de datos
    }

    scanPackage = (req, res) => {
      const data = req.body;
  
      const query = `
        INSERT INTO envios (
          ver, nrocuenta, origen_calle, origen_nro, origen_piso, origen_depto, origen_cp, 
          origen_localidad, origen_provincia, origen_contacto, origen_email, origen_solicitante, 
          origen_observaciones, origen_centrocosto, origen_idfranjahoraria, origen_idcentroimposicionorigen, 
          origen_fecha, envio_idoperativa, envio_nroremito, destinatario_apellido, destinatario_nombre, 
          destinatario_calle, destinatario_nro, destinatario_piso, destinatario_depto, destinatario_localidad, 
          destinatario_provincia, destinatario_cp, destinatario_telefono, destinatario_email, destinatario_idci, 
          destinatario_celular, destinatario_observaciones, paquete_alto, paquete_ancho, paquete_largo, 
          paquete_peso, paquete_valor, paquete_cant
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      const values = [
        data.ver, data.nrocuenta, data.origen_calle, data.origen_nro, data.origen_piso, data.origen_depto, data.origen_cp,
        data.origen_localidad, data.origen_provincia, data.origen_contacto, data.origen_email, data.origen_solicitante,
        data.origen_observaciones, data.origen_centrocosto, data.origen_idfranjahoraria, data.origen_idcentroimposicionorigen,
        data.origen_fecha, data.envio_idoperativa, data.envio_nroremito, data.destinatario_apellido, data.destinatario_nombre,
        data.destinatario_calle, data.destinatario_nro, data.destinatario_piso, data.destinatario_depto, data.destinatario_localidad,
        data.destinatario_provincia, data.destinatario_cp, data.destinatario_telefono, data.destinatario_email, data.destinatario_idci,
        data.destinatario_celular, data.destinatario_observaciones, data.paquete_alto, data.paquete_ancho, data.paquete_largo,
        data.paquete_peso, data.paquete_valor, data.paquete_cant
      ];
  
      this.db.query(query, values, (err, results) => {
        if (err) {
          console.error("Error insertando datos:", err.stack);
          res.status(500).send("Error insertando datos");
          return;
        }
        res.status(200).send("Datos insertados correctamente");
      });
    };
    
    updatePackage = (req, res) => {
      const id = req.params.id; // Se obtiene el ID del paquete desde la URL
      const data = req.body; // Se obtienen los datos a actualizar desde el body
    
      const query = `
        UPDATE envios SET
          ver = ?, nrocuenta = ?, origen_calle = ?, origen_nro = ?, origen_piso = ?, 
          origen_depto = ?, origen_cp = ?, origen_localidad = ?, origen_provincia = ?, 
          origen_contacto = ?, origen_email = ?, origen_solicitante = ?, origen_observaciones = ?, 
          origen_centrocosto = ?, origen_idfranjahoraria = ?, origen_idcentroimposicionorigen = ?, 
          origen_fecha = ?, envio_idoperativa = ?, envio_nroremito = ?, destinatario_apellido = ?, 
          destinatario_nombre = ?, destinatario_calle = ?, destinatario_nro = ?, destinatario_piso = ?, 
          destinatario_depto = ?, destinatario_localidad = ?, destinatario_provincia = ?, destinatario_cp = ?, 
          destinatario_telefono = ?, destinatario_email = ?, destinatario_idci = ?, destinatario_celular = ?, 
          destinatario_observaciones = ?, paquete_alto = ?, paquete_ancho = ?, paquete_largo = ?, 
          paquete_peso = ?, paquete_valor = ?, paquete_cant = ?, estado_interno = ?
        WHERE id = ?
      `;
    
      const values = [
        data.ver, data.nrocuenta, data.origen_calle, data.origen_nro, data.origen_piso, 
        data.origen_depto, data.origen_cp, data.origen_localidad, data.origen_provincia, 
        data.origen_contacto, data.origen_email, data.origen_solicitante, data.origen_observaciones, 
        data.origen_centrocosto, data.origen_idfranjahoraria, data.origen_idcentroimposicionorigen, 
        data.origen_fecha, data.envio_idoperativa, data.envio_nroremito, data.destinatario_apellido, 
        data.destinatario_nombre, data.destinatario_calle, data.destinatario_nro, data.destinatario_piso, 
        data.destinatario_depto, data.destinatario_localidad, data.destinatario_provincia, data.destinatario_cp, 
        data.destinatario_telefono, data.destinatario_email, data.destinatario_idci, data.destinatario_celular, 
        data.destinatario_observaciones, data.paquete_alto, data.paquete_ancho, data.paquete_largo, 
        data.paquete_peso, data.paquete_valor, data.paquete_cant, data.estado_interno, id
      ];
    
      this.db.query(query, values, (err, results) => {
        if (err) {
          console.error("Error actualizando datos:", err.stack);
          res.status(500).send("Error actualizando datos");
          return;
        }
        if (results.affectedRows === 0) {
          res.status(404).send("Paquete no encontrado");
          return;
        }
        res.status(200).send("Datos actualizados correctamente");
      });
    };
    
    getPackageById = (req, res) => {
      const id = req.params.id;
  
      const query = "SELECT * FROM envios WHERE id = ?";
      this.db.query(query, [id], (err, results) => {
        if (err) {
          console.error("Error obteniendo datos:", err.stack);
          res.status(500).send("Error obteniendo datos");
          return;
        }
        if (results.length === 0) {
          res.status(404).send("Paquete no encontrado");
          return;
        }
        res.status(200).json(results[0]);
      });
    };
    
    getPackagesADespachar = (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
  
      const query = "SELECT * FROM envios WHERE estado_interno = ? LIMIT ? OFFSET ?";
      this.db.query(query, [EstadoInterno.A_DESPACHAR, limit, offset], (err, results) => {
        if (err) {
          console.error("Error obteniendo datos:", err.stack);
          res.status(500).send("Error obteniendo datos");
          return;
        }
        res.status(200).json(results);
      });
    };
  
    getPackagesDespachados = (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
  
      const query = "SELECT * FROM envios WHERE estado_interno = ? LIMIT ? OFFSET ?";
      this.db.query(query, [EstadoInterno.DESPACHADO, limit, offset], (err, results) => {
        if (err) {
          console.error("Error obteniendo datos:", err.stack);
          res.status(500).send("Error obteniendo datos");
          return;
        }
        res.status(200).json(results);
      });
    };
  
    deletePackage = (req, res) => {
      const id = req.params.id;
  
      const query = "DELETE FROM envios WHERE id = ?";
      this.db.query(query, [id], (err, results) => {
        if (err) {
          console.error("Error eliminando el paquete:", err.stack);
          res.status(500).send("Error eliminando el paquete");
          return;
        }
        res.status(200).send("Paquete eliminado correctamente");
      });
    };

    sendToOca = async (req, res) => {
      const id = req.body.id;
  
      const query = 'SELECT * FROM envios WHERE id = ?';
      this.db.query(query, [id], async (err, results) => {
        if (err) {
          console.error('Error obteniendo datos:', err.stack);
          res.status(500).send('Error obteniendo datos');
          return;
        }
        if (results.length === 0) {
          res.status(404).send('Envío no encontrado');
          return;
        }
  
        const envio = results[0];
  
        const xml = `<?xml version="1.0" encoding="iso-8859-1" standalone="yes"?>
  <ROWS>
      <cabecera ver="${envio.ver}" nrocuenta="${envio.nrocuenta}"/>
      <origenes>
          <origen calle="${envio.origen_calle}" nro="${envio.origen_nro}" piso="${envio.origen_piso}" depto="${envio.origen_depto}" cp="${envio.origen_cp}" 
                  localidad="${envio.origen_localidad}" provincia="${envio.origen_provincia}" contacto="${envio.origen_contacto}" 
                  email="${envio.origen_email}" solicitante="${envio.origen_solicitante}" observaciones="${envio.origen_observaciones}" centrocosto="${envio.origen_centrocosto}" 
                  idfranjahoraria="${envio.origen_idfranjahoraria}" idcentroimposicionorigen="${envio.origen_idcentroimposicionorigen}" fecha="${envio.origen_fecha}">
              <envios>
                  <envio idoperativa="${envio.envio_idoperativa}" nroremito="${envio.envio_nroremito}">
                      <destinatario apellido="${envio.destinatario_apellido}" nombre="${envio.destinatario_nombre}" calle="${envio.destinatario_calle}" nro="${envio.destinatario_nro}" 
                                   piso="${envio.destinatario_piso}" depto="${envio.destinatario_depto}" localidad="${envio.destinatario_localidad}" provincia="${envio.destinatario_provincia}" 
                                   cp="${envio.destinatario_cp}" telefono="${envio.destinatario_telefono}" email="${envio.destinatario_email}" idci="${envio.destinatario_idci}" 
                                   celular="${envio.destinatario_celular}" observaciones="${envio.destinatario_observaciones}"/>
                      <paquetes>
                          <paquete alto="${envio.paquete_alto}" ancho="${envio.paquete_ancho}" largo="${envio.paquete_largo}" peso="${envio.paquete_peso}" 
                                   valor="${envio.paquete_valor}" cant="${envio.paquete_cant}"/>
                      </paquetes>
                  </envio>
              </envios>
          </origen>
      </origenes>
  </ROWS>`;
  
        try {
          const response = await axios.post('http://webservice.oca.com.ar/ePak_Tracking_TEST/Oep_TrackEPak.asmx/IngresoORMultiplesRetiros', `usr=test@oca.com.ar&psw=123456&xml_Datos=${encodeURIComponent(xml)}&ConfirmarRetiro=false&ArchivoCliente=string&ArchivoProceso=string`, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
  
          // Actualizar el estado_interno a DESPACHADO
          const updateQuery = 'UPDATE envios SET estado_interno = ? WHERE id = ?';
          this.db.query(updateQuery, [EstadoInterno.DESPACHADO, id], (updateErr, updateResults) => {
            if (updateErr) {
              console.error('Error actualizando estado:', updateErr.stack);
              res.status(500).send('Error actualizando estado');
              return;
            }
            res.status(200).send(response.data);
          });
        } catch (error) {
          console.error('Error enviando datos a OCA:', error.stack);
          res.status(500).send('Error enviando datos a OCA');
        }
      });
    };
  }

  // ---------------------- OCAFAIT ----------------------

  
  