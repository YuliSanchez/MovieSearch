// Importar Bootstrap desde node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

let valor = 0;
const urlh = window.location.href;
const params = new URLSearchParams(new URL(urlh).search);

document.addEventListener("DOMContentLoaded", async () => {
  await loadMovieDetails();
});

async function loadMovieDetails() {
  valor = params.get("movieid");
  document.querySelector(".movie-id").innerHTML = valor;
  const url = new URL("http://localhost:4000/api/moviedetails");
  url.searchParams.append("id", valor);
  console.log(valor);
  //console.log(url)
  const res = await fetch(url);
  const result = await res.json();
  console.log(result);

  let renderMovieDetails = document.getElementById("render-movie-detail");
  renderMovieDetails.innerHTML = "";
  renderMovieDetails.className = "container-fluid my-5";
  const movieDetails = document.createElement("div");
  movieDetails.className = "row justify-content-center";
  movieDetails.innerHTML = `<div class="col-md-10">
          <div class="card shadow-lg border-0 rounded-3">
            <div class="row g-0">
              <div class="col-md-5">
                <img src="${result.image}" class="img-fluid w-75 m-4 rounded-start"
                  alt="Poster de la película">
              </div>
              <!-- Detalles -->
              <div class="col-md-7">
                <div class="card-body">
                  <h2 class="card-title">${result.title}</h2>
                  <h3 class="text-muted mb-1">Director: <span id="director">${result.director}</span></h3>
                  <br>
                  <p class="text-muted mb-1">Año: <span id="year">${result.year}</span></p>
                  <p class="text-muted mb-3">Género: <span id="genre">${result.genre}</span></p>
                  <p class="card-text">Descripción: ${result.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  renderMovieDetails.appendChild(movieDetails);
}
