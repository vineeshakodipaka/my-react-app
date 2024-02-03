const mongoose = require("mongoose");

const Stddata = new mongoose.Schema({
 
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  perc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Stddata", Stddata);
