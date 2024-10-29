const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Obtener el token del header de autorización
  const authHeader = req.headers['authorization'];
  
  // Verificar si el header de autorización está presente
  if (!authHeader) {
    console.log("Token no proporcionado");
    return res.status(403).json({ message: 'Token requerido' });
  }

  // Verificar que el header tenga el formato adecuado ("Bearer <token>")
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log("Formato de token incorrecto");
    return res.status(403).json({ message: 'Formato de token incorrecto' });
  }

  // Verificar el token usando la clave secreta JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token inválido: ", err.message);
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    // Guardar el ID del usuario decodificado para futuras referencias
    console.log("Token válido, usuario decodificado:", decoded);
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;