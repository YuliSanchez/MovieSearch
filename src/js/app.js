// Importar Bootstrap desde node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Tu propio código JS
document.addEventListener("DOMContentLoaded", () => {

  fetch("http://localhost:4000/api/products")
  .then(res => res.json())
  .then(data => {
    console.log("Productos:", data);
  });


  const btn = document.getElementById("btn");
  if (btn) {
    btn.addEventListener("click", () => {
      alert("Hola desde Bootstrap + Vite 🚀");
    });
  }
});