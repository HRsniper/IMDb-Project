const form = document.getElementById("form");
const search = document.getElementById("search");
const moviesId = document.getElementById("moviesId");

const apiKey = "7a2fe517"; //omdbapi.com

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let searchValue = search.value;

    getMovies(searchValue);
});

// home
async function getMovies(search) {
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${search}`);
        console.log(response);

        let movies = response.data.Search;
        let output = "";

        movies.forEach((value, index, movie) => {
            output += `
                <div class='movieContainer'>
                    <div class='movie'>
                        <img src='${movie[index].Poster}'>
                        <h4>${movie[index].Title}</h4>
                        <a href='#' onclick="movieSelected('${movie[index].imdbID}')" class='btn-movie'>Detalhes</a>
                    </div>
                </div>
            `;
        });

        moviesId.innerHTML = output;
    } catch (error) {
        alert(error);
    }
}
/*
Search: Array(10)
0: {Title: "Home Alone", Year: "1990", imdbID: "tt0099785", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMzFkM2YwOT…mY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"}
*/

function movieSelected(id) {
    sessionStorage.setItem("movieId", id);

    window.location = "src/pages/movie.html";
    return false;
}

async function getMovie() {
    let movieId = sessionStorage.getItem("movieId");

    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
        console.log(response);

        let movie = response.data;
        let output = `
                    <div class='movieSelected'>
                        <img src='${movie.Poster}'>
                        <div class='d1'>
                            <h4>${movie.Title}</h4>
                            <ul>
                                <li><strong>duração: </strong>${movie.Runtime}</li>
                                <li><strong>tipo: </strong>${movie.Type}</li>
                                <li><strong>pais: </strong>${movie.Country}</li>
                                <li><strong>gênero: </strong>${movie.Genre}</li>
                                <li><strong>lançamento: </strong>${movie.Released}</li>
                                <li><strong>avaliado: </strong>${movie.Rated}</li>
                                <li><strong>avaliação IMDb: </strong>${movie.imdbRating}</li>
                                <li><strong>diretor: </strong>${movie.Director}</li>
                                <li><strong>atores: </strong>${movie.Actors}</li>
                                <li><strong>escritor: </strong>${movie.Writer}</li>
                                <li><strong>produtora: </strong>${movie.Production}</li>
                            </ul>
                            <div class='sinopse'>
                                <strong>sinopse: </strong>
                                <p>${movie.Plot}</p>
                                <hr>
                                <div class='buttons'>
                                    <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn-movie">Ver em IMDb</a>
                                    <a href="../../index.html" class="btn-movie">Voltar para busca</a>
                                </div>
                            </div>
                        </div>
                    </div>
            `;
        moviesId.innerHTML = output;
    } catch (error) {
        alert(error);
    }
}

/*
Actors: "Macaulay Culkin, Joe Pesci, Daniel Stern, John Heard"
Awards: "Nominated for 2 Oscars. Another 11 wins & 4 nominations."
BoxOffice: "N/A"
Country: "USA"
DVD: "05 Oct 1999"
Director: "Chris Columbus"
Genre: "Comedy, Family"
Language: "English"
Metascore: "63"
Plot: "An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation."
Poster: "https://m.media-amazon.com/images/M/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
Production: "Twentieth Century Fox"
Rated: "PG"
Ratings: (3) [{…}, {…}, {…}]
Released: "16 Nov 1990"
Response: "True"
Runtime: "103 min"
Title: "Home Alone"
Type: "movie"
Website: "N/A"
Writer: "John Hughes"
Year: "1990"
imdbID: "tt0099785"
imdbRating: "7.6"
imdbVotes: "450,846"
*/
