const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const petSchema = new Schema({
    name: String,
    animal: String,
    gender: String,
    dateOfBirth: String,
    description: String,
    healthIssues: []
  //  location: String,
  // team: String
 //   foster: { type: mongoose.Schema.Types.ObjectId, ref: "Foster" },
  

});


const Pet = model("Pet", petSchema);

module.exports = Pet;