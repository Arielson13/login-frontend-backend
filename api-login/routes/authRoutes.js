import express from "express";
import { register, login } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

/* ROTAS DE LOGIN */
router.post("/register", register);
router.post("/login", login);

/* ROTAS PROTEGIDAS */
router.get(
  "/admin-area",
  authMiddleware,
  allowRoles("admin"),
  (req, res) => res.json({ msg: "Bem-vindo admin!" })
);

router.get(
  "/professor-area",
  authMiddleware,
  allowRoles("professor", "admin"),
  (req, res) => res.json({ msg: "Bem-vindo professor!" })
);

router.get(
  "/user-area",
  authMiddleware,
  allowRoles("usuario", "professor", "admin"),
  (req, res) => res.json({ msg: "Bem-vindo usuário!" })
);

export default router;
