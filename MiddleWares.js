module.exports.IsLoggedIn = (req, res, next) => {
      if (!req.isAuthenticated()) {
            req.session.redirectUrl = req.originalUrl;
            req.flash("err", "You Must Be Logged In to Add Listings ! ");
            return res.redirect("/login");
      }
      next();
};
module.exports.RedirectUrl = (req, res, next) => {
      if (req.session.redirectUrl) {
            res.locals.Redirecturl = req.session.redirectUrl;
      }
      next();
};
