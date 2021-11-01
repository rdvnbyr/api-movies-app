const mongoose = require("mongoose");

const connect = async (res, req, next) => {
  try {
    const con = await mongoose.connect(
      process.env.MONGO_URI
    );
    console.log(`MongDB Connected ${con.connection.host}`.bgBlack.green.underline);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = connect;
