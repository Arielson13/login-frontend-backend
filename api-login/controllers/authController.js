import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "Email já registrado" });

    const hashed = await bcrypt.hash(senha, 10);

    const user = await User.create({
      nome,
      email,
      senha: hashed,
      role: role || "usuario",
    });

    res.status(201).json({ msg: "Usuário registrado com sucesso", user });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ msg: "Senha inválida" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        nome: user.nome,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ msg: "Login bem sucedido", token });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor", error });
  }
};
