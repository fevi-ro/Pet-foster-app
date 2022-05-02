// module.exports = (req, res, next) => {
//   // checks if the user is logged in when trying to access a specific page
//   if (!req.session.currentUser) {
//     return res.redirect("/auth/login");
//   }
//   req.user = req.session.currentUser;
//   next();
// };


const isLoggedIn = (req, res, next) => {
 { if (!req.session.currentUser)
      return res.redirect("/login");
  }
  next();
};

module.exports = isLoggedIn;  

