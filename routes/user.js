const express = require("express");
const router = express.Router();
const passport = require("passport");
const { RedirectUrl } = require("../MiddleWares.js");
const userController = require("../controllers/users.js");
router.route("/signup").get(userController.renderSignup).post(userController.acceptSignupinfo);
router.route("/login")
      .get(userController.loginForm)
      .post(
            RedirectUrl,
            passport.authenticate("local", {
                  failureRedirect: "/login",
                  failureFlash: true,
            }),
            userController.login
      );
router.get("/logout", userController.logout);
module.exports = router;
