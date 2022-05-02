const Pet = require("../models/Pet.model");
const User = require("../models/User.model");
const router = require("express").Router();
//const ensureAuthenticated = require("../middleware/authentication")
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

//ENSURE AUTHENTICATION
router.get('/private', ensureAuthenticated, (req, res) => {
    res.render('private', { user: req.user });
  });
   
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // The user is authenticated
      // and we have access to the logged user in req.user
      return next();
    } else {
      res.redirect('/login');
    }
  }


// READ DISPLAY LIST OF PETS

router.get("/pets", (req, res, next) => {

    Pet.find()
  //      .populate("user")

    .then((petsArr) => {

            res.render("pets/pets-list", { pets: petsArr })
        })
        .catch(err => {
            console.log("error getting pets from DB", err)
            next(err);
        });


});

// DISPLAY ONLY MY PETS

router.get('/mypets', ensureAuthenticated, (req, res, next) => {
    const { _id } = req.user;
    Pet.find({ user: _id })
      .then((myPets) => res.render('pets/my-pets', { pets: myPets }))
      .catch((err) => next(err));
  });



router.get("/pets/create", (req, res, next) => {

    User.find()
        .then((usersArr) => {
            res.render("pets/pet-create", { users: usersArr });
        })
        .catch(err => {
            console.log("error getting users from DB", err)
            next(err);
        });




})




// CREATE: process form

router.post('/pets/create', (req, res, next) => {
    const { _id } = req.user; // <-- Id from the logged user
    const newPet = {
        name: req.body.name,
        description: req.body.description,
        gender: req.body.gender,
        animal: req.body.animal,
        dateOfBirth: req.body.dateOfBirth,
        healthIssues: req.body.healthIssues,
        user: _id
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




//READ DISPLAY BOOK DETAILS
router.get("/pets/:petId", (req, res, next) => {
    const id = req.params.petId;

    Book.findById(id)
        .populate("user")
        .then((petDetails) => {
            res.render("pets/pet-details", petDetails);
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
        gender: req.body.gender,
        animal: req.body.animal,
        dateOfBirth: req.body.dateOfBirth,
        healthIssues: req.body.healthIssues
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