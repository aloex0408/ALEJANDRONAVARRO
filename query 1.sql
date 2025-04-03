DECLARE @NombreUsuario NVARCHAR(50) = 'nuevoUsuario'; -- Sustituye por el nombre de usuario deseado
DECLARE @Contraseña NVARCHAR(50) = 'contraseñaSegura'; -- Sustituye por la contraseña deseada

INSERT INTO Usuarios (NombreUsuario, Contraseña)
VALUES (@NombreUsuario, @Contraseña);
