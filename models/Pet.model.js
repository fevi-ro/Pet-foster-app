const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");


const petSchema = new Schema({
    name: String,
    animal: String,
    gender: String,
    dateOfBirth: String,
    description: String,
    healthIssues: [],
  //  location: String,
  // team: String
  // name: String
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },


});


const Pet = model("Pet", petSchema);

module.exports = Pet;