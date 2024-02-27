const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3002; // Puedes cambiar el puerto si es necesario

// Configurar MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '41922924',
  database: 'clinicaGineObs',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Configurar middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas CRUD para pacientes
// Aquí debes implementar las rutas para crear, leer, actualizar y eliminar pacientes

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Realiza una consulta a la base de datos para verificar las credenciales

  db.query('SELECT * FROM tblUsuario WHERE nombreUsuario = ? AND contrasenia = ?', [username, password], (err, results) => {
    console.log('Nombre de usuario recibido:', username);
    console.log('Contraseña recibida:', password);
    if (err) {
      console.error('Error al autenticar el usuario:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      if (results.length > 0) {
        // Usuario autenticado correctamente
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        // Credenciales incorrectas
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    }
  });
});


// Crear un paciente
app.post('/pacientes', (req, res) => {
    const nuevoPaciente = req.body;
    db.query('INSERT INTO tblPaciente SET ?', nuevoPaciente, (err, result) => {
      if (err) {
        console.error('Error al agregar un paciente:', err);
        res.status(500).json({ error: 'No se pudo agregar el paciente' });
      } else {
        console.log('Paciente agregado con éxito');
        res.status(201).json({ message: 'Paciente agregado con éxito' });
      }
    });
  });
  
  // Leer todos los pacientes
  app.get('/pacientes', (req, res) => {
    db.query('SELECT * FROM tblPaciente', (err, results) => {
      if (err) {
        console.error('Error al obtener pacientes:', err);
        res.status(500).json({ error: 'No se pudieron obtener los pacientes' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  // Actualizar un paciente por ID
  app.put('/pacientes/:id', (req, res) => {
    const idPaciente = req.params.id;
    const datosActualizados = req.body;
    db.query('UPDATE tblPaciente SET ? WHERE dpiPaciente = ?', [datosActualizados, idPaciente], (err, result) => {
      if (err) {
        console.error('Error al actualizar el paciente:', err);
        res.status(500).json({ error: 'No se pudo actualizar el paciente' });
      } else {
        console.log('Paciente actualizado con éxito');
        res.status(200).json({ message: 'Paciente actualizado con éxito' });
      }
    });
  });
  

// Eliminar un paciente por ID
app.delete('/pacientes/:id', (req, res) => {
  const idPaciente = req.params.id;
  db.query('DELETE FROM tblPaciente WHERE dpiPaciente = ?', idPaciente, (err, result) => {
    if (err) {
      console.error('Error al eliminar el paciente:', err);
      res.status(500).json({ error: 'No se pudo eliminar el paciente' });
    } else {
      console.log('Paciente eliminado con éxito');
      res.status(200).json({ message: 'Paciente eliminado con éxito' });
    }
  });
});
  


// Rutas CRUD para citas
// Crear una cita
app.post('/citas', (req, res) => {
  const nuevaCita = req.body;
  db.query('INSERT INTO tblCita SET ?', nuevaCita, (err, result) => {
    if (err) {
      console.error('Error al agregar una cita:', err);
      res.status(500).json({ error: 'No se pudo agregar la cita' });
    } else {
      console.log('Cita agregada con éxito');
      res.status(201).json({ message: 'Cita agregada con éxito' });
    }
  });
});

// Leer todas las citas
app.get('/citas', (req, res) => {
  db.query('SELECT * FROM tblCita', (err, results) => {
    if (err) {
      console.error('Error al obtener citas:', err);
      res.status(500).json({ error: 'No se pudieron obtener las citas' });
    } else {
      res.status(200).json(results);
    }
  });
});


// Actualizar una cita por ID
app.put('/citas/:id', (req, res) => {
  const idCitaConfirmada = req.params.id;
  const datosActualizados = req.body;
  db.query('UPDATE tblCita SET ? WHERE idCita = ?', [datosActualizados, idCitaConfirmada], (err, result) => {
    if (err) {
      console.error('Error al actualizar la cita:', err);
      res.status(500).json({ error: 'No se pudo actualizar la cita' });
    } else {
      console.log('Cita actualizada con éxito');
      res.status(200).json({ message: 'Cita actualizada con éxito' });
    }
  });
});

// Eliminar una cita por ID
app.delete('/citas/:id', (req, res) => {
  const idCitaConfirmada = req.params.id;
  db.query('DELETE FROM tblCita WHERE idCita = ?', idCitaConfirmada, (err, result) => {
    if (err) {
      console.error('Error al eliminar la cita:', err);
      res.status(500).json({ error: 'No se pudo eliminar la cita' });
    } else {
      console.log('Cita eliminada con éxito');
      res.status(200).json({ message: 'Cita eliminada con éxito' });
    }
  });
});