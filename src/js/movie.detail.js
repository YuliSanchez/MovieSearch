document.addEventListener("DOMContentLoaded", async () => {
 console.log('hola desde movie detail');
    const url = window.location.href; // Obtiene la URL actual
    const params = new URLSearchParams(new URL(url).search);

    const valor = params.get('movieid'); // Reemplaza 'clave' con el nombre del parámetro
    console.log(valor);
    document.querySelector('.movie-id').innerHTML=valor;
});