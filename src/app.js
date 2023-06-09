import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();
//Middleware
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Hello!!</h1>");
});
//Select all gestors
app.get("/gestor", async (req, res) => {
  try {
    const gestores = await prisma.gestor.findMany();
    console.log(gestores);
    if (gestores.length >= 1) {
      res.status(200).json(gestores);
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
});
//Select a gestor
app.get("/gestor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const gestor = await prisma.gestor.findUnique({
      where: {
        idgestor: +id,
      },
    });

    if (Object.keys(gestor).length > 0) {
      res.status(200).json(gestor);
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
});

//create a gestor

app.post("/gestor", async (req, res) => {
  try {
    const newGestor = await prisma.gestor.create({
      data: req.body,
    });
    res.status(201).json(newGestor);
  } catch (error) {
    res.status(500).json({ error: true });
  }
});

app.listen(4000, () => {
  console.log("Server Initialized...");
});
