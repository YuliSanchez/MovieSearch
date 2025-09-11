//import express from "express";
//const express = require("express");
//const cors = require("cors");
<<<<<<< HEAD
import express from "express";
import cors from "cors"
import { readFileSync } from "fs";
const movies = JSON.parse(
  readFileSync(new URL("./data/movies.json", import.meta.url), "utf-8")
);
=======
//const movies = require("movies.js");
import express from "express";
import cors from "cors"; 
import {readFileSync} from "fs";
const moviesdb = JSON.parse(
    readFileSync(new URL("./data/movies.json", import.meta.url), "utf-8"));

>>>>>>> dev
const app = express();
const PORT = 4000; // backend corre en otro puerto

// Middleware para JSON
app.use(express.json());
app.use(cors());
// Endpoint de prueba
<<<<<<< HEAD
/**
 * req => request
 * res => response
 */
app.get("/api/products", (req, res) => {
    console.log(res.originalUrl);
    console.log("hola mundo");
    res.json(movies);
=======
/** req => request
 *  res => respuesta
 */
app.get("/api/products", (req, res) => {
    console.log(res.originalUrl);
    console.log("Hola mundo");

  res.json(moviesdb);
});

app.get("/api/gendermoviecatalog", (req, res) => {
  console.log("Gender Movies Catalog");
  const generosUnicos = [...new Set(moviesdb.map(p => p.genre))];
  console.log(generosUnicos);

  res.json(generosUnicos);
>>>>>>> dev
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
<<<<<<< HEAD
});
=======
});
>>>>>>> dev
