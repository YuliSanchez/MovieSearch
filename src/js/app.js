// Importar Bootstrap desde node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

let currentPage = 1;
let pageSize = 5;


// Tu propio código JS
document.addEventListener("DOMContentLoaded", () => {
  getGenderMovie(); 

  document.querySelector("#search-movies-btn").addEventListener("click",loadMovies);
});

async function getGenderMovie() {
  try {
    const resp = await fetch('http://localhost:4000/api/gendermoviecatalog');
    if (!resp.ok) throw new Error('Error en la petición');
    const datos = await resp.json();
    console.log(datos);
    let selectgenderlist = document.getElementById("gender-list");
    selectgenderlist.innerHTML = ""; 

    let allGenderOptionElement = document.createElement("option");
    allGenderOptionElement.innerHTML = "Todos los generos";
    allGenderOptionElement.value = "Todos los generos";
    selectgenderlist.appendChild(allGenderOptionElement);

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

async function loadMovies(){

  const searhMovieToken = document.querySelector("#searchMovieToken");
  const genderMovie = document.querySelector("#gender-list");

  const url = new URL("http://localhost:4000/api/movies");
  url.searchParams.append("search", searhMovieToken.value);
  url.searchParams.append("genre", genderMovie.value);
  url.searchParams.append("page", currentPage);
  url.searchParams.append("limit", pageSize);
  const res = await fetch(url);
  const result = await res.json();
  //rendermovies
  
  //set pagination
}