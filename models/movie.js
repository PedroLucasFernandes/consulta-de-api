class Movie {
    constructor(title, posterUrl, movieId, year = '', plot = '', genre = '', director = '') {
        this.title = title;
        this.movieId = movieId;
        this.posterUrl = posterUrl;
        this.year = year;
        this.plot = plot;
        this.genre = genre;
        this.director = director;
    }
}

module.exports = { Movie };
