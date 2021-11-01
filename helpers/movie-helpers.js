const Movie = require("../models/Movie");
const __ = require("lodash");

exports.createMovieInstance = (movie) => {
  try {
    return new Movie({
      movie_id: movie.id,
      is_favorite: __.isUndefined(movie.is_favorite)
        ? false
        : movie.is_favorite,
      poster_path: __.isUndefined(movie.poster_path) ? "" : movie.poster_path,
      backdrop_path: __.isUndefined(movie.backdrop_path)
        ? ""
        : movie.backdrop_path,
      adult: __.isUndefined(movie.adult) ? false : movie.adult,
      overview: __.isUndefined(movie.adult) ? "" : movie.overview,
      release_date: __.isUndefined(movie.release_date)
        ? "2021-01-01"
        : movie.release_date,
      title: !__.isUndefined(movie.title) ? movie.title : "",
      popularity: !__.isUndefined(movie.popularity) ? movie.popularity : 0,
      vote_count: !__.isUndefined(movie.vote_count) ? movie.vote_count : 0,
      vote_average: !__.isUndefined(movie.vote_average)
        ? movie.vote_average
        : 0,
      genre_ids:
        !__.isUndefined(movie.genre_ids) && __.isArray(movie.genre_ids)
          ? movie.genre_ids
          : [],
    });
  } catch (error) {
    throw error;
  }
};
