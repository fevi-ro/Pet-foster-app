const Pet = require("../models/Pet.model");
const User = require("../models/User.model");
const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");


//animal type
//location
//gender
// const pet = req.params.pet
// url -> /pets/cat
router.get("/pets", (req, res, next) => {
    const {animal, location, gender} = req.query;
  let searchedPet;
   if (location !== undefined){
   
        searchedPet = {
            animal: animal,
            location: location,
            gender: gender
     }
    }
    else {
      searchedPet = {}
  }
   
  
   console.log(searchedPet);
   

    Pet.find(searchedPet)


    .then((petsArr) => {
        const animals = Pet.schema.path("animal").enumValues; 
            res.render("pets/pets-list", { pets: petsArr, animals })
        })
        .catch(err => {
            console.log("error getting pets from DB", err)
            next(err);
        });


});

//FILTER PETS

router.post('/pets', (req, res) => {
  //  const {location, gender, animal} = req.body;

    let filter ={}; 
    if(req.body.animal){  
    filter.animal = req.body.animal;
 }
//  if(req.body.location){  
//     filter.location = req.body.location;
//  }
 if(req.body.gender){  
    filter.gender = req.body.gender;
 }
 console.log(filter)
    Pet.find(filter)
    .then ((pets) => {
    console.log(pets)
 //     res.render('pets-list', { gender, animal, pets: result});
    })
  })



// DISPLAY ONLY MY PETS

router.get('/mypets', (req, res, next) => {

   const { _id } = req.session.currentUser;
     Pet.find({user: _id})
     
      .then((myPets) => res.render('pets/my-pets', { pets: myPets }))
      .catch((err) => next(err));
  });

 

router.get("/pets/create", (req, res, next) => {
   const animals = Pet.schema.path("animal").enumValues;
  
            res.render("pets/pet-create", { animals });

})




// CREATE: process form

router.post('/pets/create', (req, res, next) => {

  
    const newPet = {
        name: req.body.name,
        description: req.body.description,
        gender: req.body.gender,
        animal: req.body.animal,
        image: req.body.image,
        dateOfBirth: req.body.dateOfBirth,
        healthIssues: req.body.healthIssues,
        location: req.body.location,
        user: req.session.currentUser._id,
      //  location: req.session.currentUser.location
    }
   
    Pet.create(newPet)
   
        .then((petFromDB) => {
            res.redirect("/pets")
        })
        .catch(err => {
            console.log("error creating pets on DB", err)
            next(err);
        });

});




//READ DISPLAY PET DETAILS
router.get("/pets/:petId", (req, res, next) => {
    const id = req.params.petId;

    Pet.findById(id)
        .populate("user")
        .then((petDetails) => {
            res.render("pets/pet-details", petDetails,);
        })
        .catch(err => {
            console.log("error getting pet details from DB", err)
            next(err);
        });
})



// UPDATE: display form
router.get("/pets/:petId/edit", (req, res, next) => {
    const id = req.params.petId;
    Pet.findById(id)
        .then((petDetails) => {
            res.render("pets/pet-edit", petDetails);
        })
        .catch(err => {
            console.log("error getting pet details from DB", err)
            next(err);
        });
});

// UPDATE: process form 
router.post("/pets/:petId/edit", isLoggedIn, (req, res, next) => {

    const id = req.params.petId;

    const newDetails = {
        name: req.body.name,
        description: req.body.description,
     
        dateOfBirth: req.body.dateOfBirth,
        image: req.body.image,
        healthIssues: req.body.healthIssues,
        location: req.body.location,
        user: req.session.currentUser._id
    };

    Pet.findByIdAndUpdate(id, newDetails)
        .then((petFromDB) => {
            res.redirect(`/pets/${petFromDB._id}`);
        })
        .catch(err => {
            console.log("error updating pet in DB", err)
            next(err);
        });
});


//DELETE functionality   

router.post('/pets/:petId/delete', isLoggedIn, (req, res, next) => {
    const id = req.params.petId;

    Pet.findByIdAndDelete(id)
        .then(() => res.redirect('/pets'))
        .catch(err => {
            console.log("error deleting pet from DB", err)
            next(err);
        });
});





module.exports = router;