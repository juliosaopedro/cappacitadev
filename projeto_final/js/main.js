$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=5bbf08abe43b66d02c5bccc1236d8b38&query='+ searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" style='height:520 width=330'>
              <h5>${movie.original_title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Detalhes...</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=5bbf08abe43b66d02c5bccc1236d8b38')
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
          </div>
          <div class="col-md-8">
            <h2>${movie.original_title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genero:</strong> ${movie.genres[0].name}</li>
              <li class="list-group-item"><strong>Lançamento:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>IMDB:</strong> ${movie.imdb_id}</li>
              <li class="list-group-item"><strong>Nota:</strong> ${movie.vote_average}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Resumo</h3>
            ${movie.overview}
            <hr>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">Ver IMDB</a>
            <a href="index.html" class="btn btn-default">Voltar</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
