const Pet = require("../models/Pet.model");
const Foster = require("../models/Foster.model");
const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");


// READ DISPLAY LIST OF BOOKS

router.get("/pets", (req, res, next) => {

    Pet.find()
  //      .populate("foster")

    .then((petsArr) => {

            res.render("pets/pets-list", { pets: petsArr })
        })
        .catch(err => {
            console.log("error getting pets from DB", err)
            next(err);
        });


});



// CREATE: render form

// router.get('/books/create', (req, res) => {
//     const id = req.params.authorId;
//     Author.findById(id)
//         .then(() => {
//             res.render('books/book-create.hbs');
//         })
//         .catch(err => {
//             console.log("error", err)
//             next(err);
//         });
// })

router.get("/books/create", (req, res, next) => {

    Author.find()
        .then((authorsArr) => {
            res.render("books/book-create", { authors: authorsArr });
        })
        .catch(err => {
            console.log("error getting authors from DB", err)
            next(err);
        });




})




// CREATE: process form

router.post('/books/create', (req, res, next) => {
    const newBook = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating
    }
    Book.create(newBook)
        .then((bookFromDB) => {
            res.redirect("/books")
        })
        .catch(err => {
            console.log("error creating book on DB", err)
            next(err);
        });

});




//READ DISPLAY BOOK DETAILS
router.get("/books/:bookId", (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
        .populate("author")
        .then((bookDetails) => {
            res.render("books/book-details", bookDetails);
        })
        .catch(err => {
            console.log("error getting book details from DB", err)
            next(err);
        });
})



// UPDATE: display form
router.get("/books/:bookId/edit", (req, res, next) => {
    const id = req.params.bookId;
    Book.findById(id)
        .then((bookDetails) => {
            res.render("books/book-edit", bookDetails);
        })
        .catch(err => {
            console.log("error getting book details from DB", err)
            next(err);
        });
});

// UPDATE: process form
router.post("/books/:bookId/edit", isLoggedIn, (req, res, next) => {

    const id = req.params.bookId;

    const newDetails = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating,
    };

    Book.findByIdAndUpdate(id, newDetails)
        .then((bookFromDB) => {
            res.redirect(`/books/${bookFromDB._id}`);
        })
        .catch(err => {
            console.log("error updating book in DB", err)
            next(err);
        });
});


//DELETE functionality

router.post('/books/:bookId/delete', isLoggedIn, (req, res, next) => {
    const id = req.params.bookId;

    Book.findByIdAndDelete(id)
        .then(() => res.redirect('/books'))
        .catch(err => {
            console.log("error deleting book from DB", err)
            next(err);
        });
});





module.exports = router;