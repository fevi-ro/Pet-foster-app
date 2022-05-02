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


  module.exports = {
      router,
    ensureAuthenticated
};