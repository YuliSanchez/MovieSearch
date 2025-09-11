//import express from "express";
//const express = require("express");
//const cors = require("cors");
import express from "express";
import cors from "cors"
import { readFileSync } from "fs";
const movies = JSON.parse(
  readFileSync(new URL("./data/movies.json", import.meta.url), "utf-8")
);
const app = express();
const PORT = 4000; // backend corre en otro puerto

// Middleware para JSON
app.use(express.json());
app.use(cors());
// Endpoint de prueba
/**
 * req => request
 * res => response
 */
app.get("/api/products", (req, res) => {
    console.log(res.originalUrl);
    console.log("hola mundo");
    res.json(movies);
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
