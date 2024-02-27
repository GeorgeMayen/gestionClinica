const mysql = require('mysql');

// Configuración de la conexión a la base de datos MySQL
var conexion = mysql.createConnection({
  host: 'localhost',        // Cambia esto por la dirección de tu servidor de base de datos
  user: 'root',       // Cambia esto por tu nombre de usuario de MySQL
  password: '41922924', // Cambia esto por tu contraseña de MySQL
  database: 'clinicaGineObs' // Cambia esto por el nombre de tu base de datos
});

// Conectar a la base de datos MySQL
conexion.connect(function(err) {
  if (err) {
    throw err;
    } else {
    console.log('Conexión a la base de datos MySQL establecida');
  }
});

conexion.end();
// Exporta la conexión para que puedas usarla en otros módulos
//module.exports = db;