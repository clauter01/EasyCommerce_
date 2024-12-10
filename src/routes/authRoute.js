import express from "express";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { isAuthenticated } from "../middleware/auth.js";
import { z } from 'zod';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post("/register", validate(z.object({
  body: z.object({
    name: z.string(),
    password: z.string(),
    email: z.string().email(),
  })
})), async (req, res) => {
  const data = req.body;

  try {
    // verificando existencia dos dados
    if (!data.email || !data.password || !data.name) {
      return res.status(400).json({ message: "campos incompletos" });
    }

    const userDb = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userDb) {
      return res.status(403).json({ message: "email ja cadastrado" });
    }

    // criando usuario
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
        name: data.name,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login",validate(z.object({
  body: z.object({
    password: z.string(),
    email: z.string().email(),
  })
})), async (req, res) => {
  const data = req.body;

  try {
    // verificando existencia dos dados
    if (!data.email || !data.password) {
      return res.status(400).json({ message: "campos incompletos" });
    }

    // buscando usuario
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "usuario nao encontrado" });
    }

    // verificando senha
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "senha invalida" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ user, token, auth: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/auth", isAuthenticated, (req, res) => {
  res.json({ message: "usuario autenticado", auth: true });
});

export default router;
