const router = require("express").Router();
const movieController = require("../controllers/movie");

router.get("/get-movies-from-api", movieController.getMoviesFromApi);

router.get("/get-movies/:limit", movieController.getMovies);

router.get("/:movieId/get-movie", movieController.getMovie);

router.post("/create-movie", movieController.createMovie);

router.patch("/:movieId/update-movie", movieController.updateMovie);

router.delete("/:movieId/delete-movie", movieController.deleteMovie);

module.exports = router;
