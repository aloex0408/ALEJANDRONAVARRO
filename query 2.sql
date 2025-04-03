DECLARE @NombreUsuario NVARCHAR(50) = 'usuarioEjemplo'; -- Sustituye 'usuarioEjemplo' por el nombre de usuario a verificar

SELECT COUNT(*) AS UsuarioExiste
FROM Usuarios
WHERE NombreUsuario = @NombreUsuario;
