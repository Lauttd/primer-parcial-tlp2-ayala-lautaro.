import jwt from "jsonwebtoken";

// * funcion para crear un token con una firma secreta y un tiempo de expiración
export const signToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
// * funcion para verificar que un token este con la misma firma secreta
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
