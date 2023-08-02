class Movie {
    constructor(title,posterUrl, movieId, movieDetails){
     this.title = title;
     this.movieId = movieId;
     this.posterUrl = posterUrl;
     this.movieDetails = movieDetails;
    }

}


class MovieDetails{
    constructor(year, plot, genre, director){
        this.year = year;
        this.plot = plot;
        this.genre = genre;
        this.director = director;
    }
}


module.exports = { Movie, MovieDetails };