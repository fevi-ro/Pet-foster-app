const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");


const petSchema = new Schema({
    name: String,
    animal: { type: String, enum: ["dog", "cat", "rabbit", "guinea pig", "hamster"]},
    gender: String,
    dateOfBirth: String,
    image: String, 
    description: String,
    healthIssues: [],
   user: {
      type: mongoose.Schema.Types.ObjectId,
       ref: "User" }
});

  //  location: String,
  // team: String
  // name: String
const Pet = model("Pet", petSchema);


module.exports = Pet;


// pets-list {{this.user.name}} {{this.user.location}} {{this.user.team}}

//my-pets.hbs
//everything from pets list 
//pet-create exactly as book-create, replace books --> pets, author --> user, every data from const newPet except user id


//pet-details every information from pets

//pet-edit every information from newDetails

// const petSchema = new Schema({
//   name: String,
//   animal: String,
//   author: {
//       type: Schema.Types.ObjectId,
//       ref: 'User'
//   },
//   foster: {
//       type: Schema.Types.ObjectId,
//       ref: 'User'
//   },

// });
