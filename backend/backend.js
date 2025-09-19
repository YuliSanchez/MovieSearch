//import express from "express";
//const express = require("express");
//const cors = require("cors");
//const movies = require("movies.js");
import express from "express";
import cors from "cors"; 
import {readFileSync} from "fs";
const moviesdb = JSON.parse(
    readFileSync(new URL("./data/movies.json", import.meta.url), "utf-8"));

const app = express();
const PORT = 4000; // backend corre en otro puerto

// Middleware para JSON
app.use(express.json());
app.use(cors());
// Endpoint de prueba
/** req => request
 *  res => respuesta
 */
app.get("/api/products", (req, res) => {

  res.json(moviesdb);
});

app.get("/api/gendermoviecatalog", (req, res) => {
  const generosUnicos = [...new Set(moviesdb.map(p => p.genre))];

  res.json(generosUnicos);
});

app.get("/api/movies", (req, res) => {
  try {
    // ... lógica
    let { search = "", genre = "Todos los generos", page = 1, limit = 5 } = req.query;
  search = search.toLowerCase();
  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = moviesdb.filter(m =>
    m.title.toLowerCase().includes(search) ||
    m.director.toLowerCase().includes(search)
  );

   // Filtrar por género
  if (genre !== "Todos los generos") {
    filtered = filtered.filter(m => m.genre === genre);
  }

   // Total antes de paginar
  const total = filtered.length;

  // Paginado
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);
  var result = {
    "total":total,
    "page":page,
    "limit":limit,
    "totalPages": Math.ceil(total / limit),
    "data": paginated
  };
 
  console.log(result);
  res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
  
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});