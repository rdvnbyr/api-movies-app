const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ListSchema = require("./_List");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    to_do_list: [ListSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
