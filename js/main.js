$(document).ready(function(){
      $('#searchForm').on('submit', function(e){
            let searchText = $('#searchText').val();
            getMovies(searchText);
            e.preventDefault();
      });
});

function getMovies(searchText){
    axios.get('https://api.themoviedb.org/3/account?s=' +searchText).then((response) => {
        console.log(response);
        let movies = response.data.search;
        let output = '';
        $.each(movies, (index, movie) => {
            output +=`
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary">Movie Details</a>
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

function movieSelected(){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i=' +movieId).then((response) => {
        let movie = response.data;

        let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre: </strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released: </strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated: </strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating: </strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director: </strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer: </strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors: </strong> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    </hr>
                    <a href="http://imdb.com/title/${movie.imdb}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-default">Go to Home</a>
                </div>
            </div>
        `;
    })
    .catch((err) => {
        console.log(err);
    });
}