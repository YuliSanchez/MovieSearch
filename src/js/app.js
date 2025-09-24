// Importar Bootstrap desde node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//variables Globales en el scope de Movies scope de js
// manejar el estado de la aplicación.
let currentPage = 1;
let pageSize = 5;
let totalPages = 0;
let totalmovies = 0;
let searchToken = "";
let selectedGenre = "";
// Tu propio código JS
document.addEventListener("DOMContentLoaded", async () => {
  let title = "hola mundo";
  await getGenderMovie();
  await loadMovies();

  document
    .querySelector("#search-movies-btn")
    .addEventListener("click", loadMovies);
});

function setDebugInfo() {
  let debugElement = document.querySelector(".debug-info");
  debugElement.innerHTML = "";
  let debugInfo = `<p>totalmovies: ${totalmovies} | currentPage: ${currentPage} | totalPages: ${totalPages} | pageSize: ${pageSize}</p>
                    <p>searchToken: ${searchToken} | selectedGenre: ${selectedGenre}</p>`;
  debugElement.innerHTML = debugInfo;
}

async function getGenderMovie() {
  try {
    const resp = await fetch("http://localhost:4000/api/gendermoviecatalog");
    if (!resp.ok) throw new Error("Error en la petición");
    const datos = await resp.json();
    console.log(datos);
    let selectgenderlist = document.getElementById("gender-list");
    selectgenderlist.innerHTML = "";

    let allGenderOptionElement = document.createElement("option");
    allGenderOptionElement.innerHTML = "Todos los generos";
    allGenderOptionElement.value = "Todos los generos";
    selectgenderlist.appendChild(allGenderOptionElement);

    datos.forEach((dato) => {
      const datoGenero = document.createElement("option");
      datoGenero.innerHTML = `${dato}`;
      datoGenero.value = `${dato}`;
      selectgenderlist.appendChild(datoGenero);
    });
    selectedGenre = "Todos los generos";

    selectgenderlist.addEventListener("change", () => {
      selectedGenre = selectgenderlist.value;
      currentPage = 1;
      setDebugInfo();
    });

    const searchMovieTokenElement = document.querySelector("#searchMovieToken");
    searchMovieTokenElement.addEventListener('keyup',(e)=>{
      searchToken = searchMovieTokenElement.value;
      currentPage = 1;
      setDebugInfo();
    });

    const pageSizeTokenElement = document.querySelector("#page-size");
    pageSizeTokenElement.value = pageSize;
    pageSizeTokenElement.addEventListener('change',()=>{
      pageSize = pageSizeTokenElement.value;
      currentPage = 1;
      setDebugInfo();
    });
  } catch (err) {
    console.error(err);
  }
}

async function loadMovies() {
  

  const url = new URL("http://localhost:4000/api/movies");
  url.searchParams.append("search", searchToken);
  url.searchParams.append("genre", selectedGenre);
  url.searchParams.append("page", currentPage);
  url.searchParams.append("limit", pageSize);
  const res = await fetch(url);
  const result = await res.json();
  
  console.log(result);
  totalmovies = result.total;
  totalPages = result.totalPages;
  setDebugInfo();
  //rendermovies
    let renderMoviesList = document.getElementById("movies-list");
    renderMoviesList.innerHTML = "";
    result.data.forEach((movie) => {
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
              <a href="movie-detail.html?movieid=${movie.id}" class="btn btn-sm btn-primary">Ver más</a>
            </div>
          </div>`;
        renderMoviesList.appendChild(movieList);
  });
  //set pagination
  //console.log(moviesresult.page);
  //set pagination
  paintPagination();
}

function paintPagination() {
  let pagination = document.getElementById("pagination");
  pagination.className = "pagination justify-content-center";
  pagination.innerHTML = "";
  let pageAnterior = document.createElement("li");
  pageAnterior.className = `page-item ${currentPage > 1 ? "" : "disabled"}`;
  pageAnterior.innerHTML = `<a class="page-link" href="#" tabindex="-1">Anterior</a>`;
  pageAnterior.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage = currentPage - 1;
      loadMovies();
    }
  });
  pagination.appendChild(pageAnterior);

  for (let i = 1; i <= totalPages; i++) {
    let npaginas = document.createElement("li");
    npaginas.className = "page-item";
    npaginas.innerHTML = `<a class="page-link ${
      currentPage === i ? "active" : ""
    }">${i}</a>`;
    npaginas.addEventListener("click", (e) => {
      e.preventDefault();
      //loadMovies(i); // carga esa página
      currentPage = i;
      loadMovies();
    });
    pagination.appendChild(npaginas);
  }

  let pageSiguiente = document.createElement("li");
  pageSiguiente.className = `page-item ${
    currentPage === totalPages ? "disabled" : ""
  }`;
  pageSiguiente.innerHTML = `<a class="page-link" href="#">Siguiente</a>`;
  pageSiguiente.addEventListener("click", (e) => {
    console.log(e);
    if (currentPage < totalPages) {
      currentPage = currentPage + 1;
      loadMovies();
    }
  });
  pagination.appendChild(pageSiguiente);
}

function buildMovieDetailLink(){

}
