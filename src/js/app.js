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
  //rendermovies
  const moviesresult = await res.json();
  console.log(moviesresult);
  //rendermovies
  let renderMoviesList = document.getElementById("movies-list");
    renderMoviesList.innerHTML = "";
    moviesresult.data.forEach((movie) => {
      const movieList = document.createElement("div");
        movieList.className = "col-sm-6 col-md-4 col-lg-3";
        movieList.innerHTML = `<div class="card movie-card">
          <img src="${movie.image}"class="card-img-top" alt="Póster película"/>
          <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">
                Año: ${movie.year}<br />
                Director:${movie.director}
              </p>
              <a href="#" class="btn btn-sm btn-primary">Ver más</a>
            </div>
          </div>`;
        renderMoviesList.appendChild(movieList);
    console.log(movie.title)});
  //set pagination
  paintPagination(moviesresult.page,moviesresult.totalPages); 
  //console.log(moviesresult.page);
}

function paintPagination(page, totalPages) {
  let pagination = document.getElementById("pagination");
  pagination.className = "pagination justify-content-center";
  pagination.innerHTML = ""
  let pageAnterior = document.createElement("li");
  pageAnterior.className = "page-item disabled";
  pageAnterior.innerHTML = `<a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>`;
  pagination.appendChild(pageAnterior);
  for (let i = 1; i <= totalPages; i++) {
    let npaginas = document.createElement("li");
    npaginas.className = "page-item";
    npaginas.innerHTML = `<a class="page-link" href="#">${i}</a>`
    pagination.appendChild(npaginas);
   }
  let pageSiguiente = document.createElement("li");
  pageSiguiente.className = "page-item";
  pageSiguiente.innerHTML = `<a class="page-link" href="#">Siguiente</a>`;
  pagination.appendChild(pageSiguiente);
  }