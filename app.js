const express = require("express");
const connect = require("./configs/db");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("colors");

dotenv.config(); // set .env
const app = express(); // create express app
app.use(cors()); // cors policy
app.use(express.json()); // body parsed

// multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// multer image upload middleware
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);

// path for images
app.use("/images", express.static(path.join(__dirname, "images")));

// routes
const movieRoutes = require("./routes/movie");
app.use("/api/movie", movieRoutes);

// error handling
app.use((error, req, res, next) => {
  console.log(`${error}`.red.bold);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

// DB COnnect
connect();

const port = process.env.PORT || 8080;
app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${port}`.bgBlack.yellow
  )
);
