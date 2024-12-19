const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("API is running");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    res.status(400).send("Product not found");
  }

  res.send(product);
});

app.post("/products", async (req, res) => {
  const { name, description, image, price } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      image,
      price,
    },
  });

  res.send({
    data: product,
    message: "Product created successfully",
  });
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;

  await prisma.product.delete({
    where: {
      id,
    },
  });

  res.send("Product deleted successfully");
});

app.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description, image, price } = req.body;

  if (!name || !description || !image || !price) {
    return res.status(400).send("All fields are required");
  }

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      description,
      image,
      name,
      price,
    },
  });

  res.send({
    data: product,
    message: "Product updated successfully",
  });
});

app.patch("/products/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description, image, price } = req.body;

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      description,
      image,
      name,
      price,
    },
  });

  res.send({
    data: product,
    message: "Product updated successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
