const config = {
    user: 'alex', // Reemplaza con tu nombre de usuario de Azure SQL
    password: 'Mnbvcxz.', // Reemplaza con tu contraseña de Azure SQL
    server: 'qwwq.database.windows.net', // Nombre del servidor
    database: 'qwwq', // Nombre de tu base de datos
    options: {
        encrypt: true, // Azure requiere conexiones cifradas
        trustServerCertificate: false,
    }
};

module.exports = config;
