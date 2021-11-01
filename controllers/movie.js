const axios = require("axios");
const _movieHelpers = require("../helpers/movie-helpers");
const Movie = require("../models/Movie");
const { isUndefined, isEmpty } = require("lodash");

exports.getMoviesFromApi = async (req, res, next) => {
  const pages = [];
  for (let i = 1; i < 21; i++) {
    pages.push(i);
  }
  let results = [];
  const errors = [];
  for await (const page of pages) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=${page}`
      );
      results = [].concat(response.data.results, results);
    } catch (error) {
      errors.push(error);
    }
  }

  if (results.length === 0) {
    const error = new Error("Some error occured during the action.");
    error.statusCode = 400;
    return next(error);
  }

  const movies = results.map((res) => {
    if (isUndefined(res) || isEmpty(res)) {
      return null;
    }
    return _movieHelpers.createMovieInstance(res);
  });

  await Movie.insertMany(movies);

  res
    .status(200)
    .json({ message: `${movies.length} movies added successfully.` });
};

exports.createMovie = async (req, res, next) => {
  try {
    const { file, ...rest } = req.body;
    if (!file) {
      const error = new Error("No image uploaded");
      error.statusCode = 422;
      throw error;
    }
    rest.poster_path = file.path;
    const movie = _movieHelpers.createMovieInstance(rest);
    const saveMovie = await movie.save();
    res.status(200).json(saveMovie);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const body = req.body;
    await Movie.findByIdAndUpdate(movieId, body);
    res.status(200).json({ message: "The Movie successfully updated." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getMovies = async (req, res, next) => {
  try {
    const { limit } = req.params;
    if (!limit) {
      const error = new Error("Limit is required.");
      error.statusCode = 404;
      throw error;
    }
    const movies = await Movie.find().limit(limit);
    if (!movies) {
      const error = new Error("movies not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Data is fetched.",
      data: movies,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    res.status(200).json(movie);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    await Movie.findByIdAndDelete(movieId);
    res.status(200).json({ message: "Movie successfuly deleted." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
