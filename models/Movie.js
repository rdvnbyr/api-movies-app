const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    movie_id: {
      type: String,
    },
    poster_path: {
      type: String,
    },
    backdrop_path: {
      type: String,
    },
    adult: {
      type: Boolean,
    },
    overview: {
      type: String,
    },
    release_date: {
      type: String,
    },
    title: {
      type: String,
    },
    popularity: {
      type: Number,
    },
    vote_count: {
      type: Number,
    },
    vote_average: {
      type: Number,
    },
    is_favorite: {
      type: Boolean,
    },
    genre_ids: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movies", MovieSchema);
