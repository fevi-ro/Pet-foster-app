// bin/seeds.js

const mongoose = require('mongoose');
const Foster = require('../models/Foster.model');
const Pet = require('../models/Pet.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/Pet-foster-app';

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });






const pets = [{
    name: "Peaches",
    animal: "Dog",
    gender: "female",
    dateOfBirth: "March 2018",
    description: "iefgjigjwogjiogogwgwj",
    healthIssues: ["Diabetes", "Kidney"]
    },



    {
        name: "Minette",
        animal: "Cat",
        gender: "female",
        dateOfBirth: "January 2020",
        description: "iefgjigjwogjiogogwgwj",
        healthIssues: ["Obesity", "Heart"]
    }
];




 Pet.create(pets)
    .then(petsFromDB => {
                 console.log(`Created ${petsFromDB.length} pets`);

        // Once created, close the DB connection
       mongoose.connection.close();
   })
   .catch(err => console.log(`An error occurred while creating books from the DB: ${err}`));