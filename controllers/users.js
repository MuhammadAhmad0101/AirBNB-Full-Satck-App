const User = require("../model/userModel");

module.exports.renderSignup = (req, res) => {
      res.render("./validationForm/form.ejs");
};

module.exports.acceptSignupinfo = async (req, res, next) => {
      try {
            let { username, email, password } = req.body;
            let user = new User({ username, email });
            let registeredUser = await User.register(user, password);
            req.login(registeredUser, (error) => {
                  if (error) next(error);
                  req.flash("listCreated", "Welcome To AirBnb");
                  res.redirect("/listings");
            });
      } catch (error) {
            req.flash("err", error.message);
            res.redirect("/signup");
      }
};

module.exports.login = (req, res) => {
      let redirectUrl = res.locals.Redirecturl || "listings";
      res.redirect(redirectUrl);
};

module.exports.loginForm = (req, res) => {
      res.render("./validationForm/loginform.ejs");
};

module.exports.logout = (req, res, next) => {
      req.logout((error) => {
            if (error) {
                  next(error);
            }
            req.flash("listCreated", "Succecfully Logged out ! ");
            res.redirect("/listings");
      });
};
