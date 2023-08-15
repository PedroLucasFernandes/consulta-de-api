class Movie {
    constructor(title, posterUrl, movieId, year, plot, genre, director) {
        this.title = title;
        this.movieId = movieId;
        this.posterUrl = posterUrl;
        this.year = year;
        this.plot = plot;
        this.genre = genre;
        this.director = director;
    }
    
    static instanceMovieFromApiResponse(apiMovie) {
        const { Title, Poster, imdbID, Year, Plot, Genre, Director } = apiMovie;
        const IsThereImage = Poster === 'N/A';
        const NoImagePath = '/images/No-Image.jpg';

        return new Movie(Title, IsThereImage ? NoImagePath : Poster, imdbID, Year, Plot, Genre, Director);
    }

}

module.exports = { Movie };
