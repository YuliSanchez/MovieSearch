// Importar Bootstrap desde node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Tu propio código JS
document.addEventListener("DOMContentLoaded", () => {
  
  getGenderMovie(); 

/*  fetch("http://localhost:4000/api/products")
  .then(res => res.json())
  .then(data => {
    //console.log("Productos:", data);
});*/

  const btn = document.getElementById("btn");
  if (btn) {
    btn.addEventListener("click", () => {
      alert("Hola desde Bootstrap + Vite 🚀");
    });
  }
});

async function getGenderMovie() {
  try {
    const resp = await fetch('http://localhost:4000/api/gendermoviecatalog');
    if (!resp.ok) throw new Error('Error en la petición');
    const datos = await resp.json();
    console.log(datos);
    let selectgenderlist = document.getElementById("gender-list");
    selectgenderlist.innerHTML = ""; 
    datos.forEach((dato)=>{
      const datoGenero = document.createElement("option");
      datoGenero.innerHTML = `${dato}`;
      datoGenero.value= `${dato}`;
      selectgenderlist.appendChild(datoGenero); 
    })
  } catch (err) {
    console.error(err);
  }
}
