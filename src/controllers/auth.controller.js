import { comparePassword } from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/mongoose/user.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  const { username, email, password, profile } = req.body;
  try {
    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profile,
    });
    return res
      .status(201)
      .json({ msg: "Usuario registrado correctamente", data: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    const isAuthenticated = await comparePassword(password, user.password);

    if (!isAuthenticated || !user) {
      throw new Error("Las credenciales son incorrectas");
    }

    const token = signToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    return res.status(200).json({ msg: "Logueado correctamente", data: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // Buscar usuario en la base de datos (excluyendo el password)
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      data: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
      msg: "Perfil obtenido exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
