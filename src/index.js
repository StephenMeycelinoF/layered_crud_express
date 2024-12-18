const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get("/api", (req, res) => {
  res.send("API is running");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
