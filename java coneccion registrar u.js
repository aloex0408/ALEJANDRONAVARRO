const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const config = require('./dbConfig');

const app = express();
app.use(bodyParser.json());

// Conexión a la base de datos
sql.connect(config).then(pool => {
    console.log('Conectado a Azure SQL');

    // Ruta para registrar usuario
    app.post('/register', async (req, res) => {
        const { username, password } = req.body;
        try {
            const result = await pool.request()
                .input('NombreUsuario', sql.VarChar, username)
                .input('Contraseña', sql.VarChar, password)
                .query('INSERT INTO Usuarios (NombreUsuario, Contraseña) VALUES (@NombreUsuario, @Contraseña)');

            res.status(200).send({ message: 'Usuario registrado exitosamente' });
        } catch (err) {
            if (err.number === 2627) { // Error por clave única duplicada
                res.status(400).send({ message: 'El usuario ya existe' });
            } else {
                console.error(err);
                res.status(500).send({ message: 'Error al registrar usuario' });
            }
        }
    });

    // Ruta para comprobar usuario
    app.post('/checkUser', async (req, res) => {
        const { username } = req.body;
        try {
            const result = await pool.request()
                .input('NombreUsuario', sql.VarChar, username)
                .query('SELECT COUNT(*) AS UsuarioExiste FROM Usuarios WHERE NombreUsuario = @NombreUsuario');

            const exists = result.recordset[0].UsuarioExiste > 0;
            res.status(200).send({ exists });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error al comprobar usuario' });
        }
    });

}).catch(err => {
    console.error('Error al conectar a la base de datos:', err);
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
