if (process.env.NODE_ENV != "production") require("dotenv").config();

const express = require("express");
const app = express(); //App
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/userModel.js");
const mongoose = require("mongoose"); //Mongoose
//Mongoose Connection
const dburl = process.env.ATLAS_URL;
main().catch((err) => console.log(err));
async function main() {
      await mongoose.connect(dburl);
}
const store = MongoStore.create({
      mongoUrl: dburl,
      touchAfter: 24 * 3600,
      crypto: {
            secret: process.env.SECRET,
      },
});
store.on("error", () => {
      console.log("Error in MongoDB Session", error);
});
const sessionOptions = {
      store,
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
      },
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
      res.locals.newlistCreated = req.flash("listCreated");
      res.locals.errorforid = req.flash("err");
      res.locals.currentUser = req.user;
      next();
});
app.use(methodOverride("_method")); //Middleware
app.use(express.urlencoded({ extended: true })); //Middleware
app.use(express.json()); //Middleware
app.set("view engine", "ejs");
app.engine("ejs", engine);
//Costume Error
const ExpressError = require("./Error/Express.js");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// All Router Here
const listing = require("./routes/listing.js");
const review = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const { error } = require("console");

app.use("/", userRouter);
app.use("/listings", listing);
app.use("/listings/:id/review", review);

//MiddleWare for Error handler
app.all("*", (req, res, next) => {
      next(new ExpressError(404, "Page Not Found Ahmad Try karo"));
});
app.use((error, req, res, next) => {
      let { status = 401, message = "F" } = error;
      res.render("ErrorPage", { status, message });
});
app.listen(3000);