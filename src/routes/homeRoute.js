import express from "express";
import prisma from "../config/prisma.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const users = await prisma.product.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const prodId = Number(req.params.id);

    const user = await prisma.product.findUnique({
      where: {
        id: prodId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "usuario nao encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;