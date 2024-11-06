import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Session from '../models/session.js';

export const protect = async (req, res, next) => {
    console.log('cookies', req.cookies);

    const sessionId = req.cookies.sessionId;
    console.log('SESSION ID', sessionId);
  if (!sessionId) {
    return res.status(401).json({ message: 'Not authorized, no tokens' });
  }

  const session = await Session.findOne( { sessionId } );
  console.log(session);
  if (!session) {
    return res.status(401).json({ message: 'Not authorized, no session' });
  }

  try {
    // Verificar si el accessToken es válido
    const decodedAccessToken = jwt.verify(session.token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedAccessToken.id).select('-password');
    next(); // Si el accessToken es válido, continuar a la siguiente función
  } catch (error) {
    console.log(error);

    // Si el accessToken ha expirado, intentar con el refreshToken
    if (error.name === 'TokenExpiredError' && refreshToken) {
      try {
        const decodedRefreshToken = jwt.verify(session.refreshToken, process.env.JWT_SECRET_REFRESH);
        console.log('decodedRefreshToken', decodedRefreshToken);

        // Si el refreshToken es válido, generar un nuevo accessToken
        const newAccessToken = jwt.sign(
          { id: decodedRefreshToken.id },
          process.env.JWT_SECRET,
          { expiresIn: '1d' } 
        );

        await session.updateOne({
            token: newAccessToken,
        });

        // Adjuntar el usuario a la solicitud y proceder
        req.user = await User.findById(decodedRefreshToken.id).select('-password');
        next();
      } catch (refreshError) {
        console.log(refreshError);
        // Si el refreshToken también es inválido o ha expirado
        res.status(401).json({ message: 'Not authorized, refresh token failed' });
      }
    } else {
      // Si el error del accessToken no es de expiración o no hay refreshToken
      res.status(401).json({ message: 'Not authorized, access token failed' });
    }
  }
};
