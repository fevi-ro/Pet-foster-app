const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const fosterSchema = new Schema({
    name: String,
    location: String,
    team: String

});


const Foster = model("Foster", fosterSchema);

module.exports = Foster;