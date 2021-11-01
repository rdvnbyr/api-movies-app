const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    header: {
      type: String,
    },
    short_description: {
      type: String,
      length: 200,
    },
    long_description: {
      type: String,
    },
    is_active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = ListSchema;
