import { signToken, verifyToken } from "../helpers/jwt.helper.js";
import { comparePassword } from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/mongoose/user.model";
import { generateToken } from "../../../trabajo-practico-integrador-2/src/helpers/jwt.helper";

export const register = async (req, res) => {
  try {
    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    const authenticated = await comparePassword(password, user.password);

    if (!authenticated || !user) {
      throw new Error("Las credenciales son incorrectas");
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({ data: token });

    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
