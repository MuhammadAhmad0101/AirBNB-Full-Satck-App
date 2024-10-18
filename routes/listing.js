const express = require("express");
const router = express.Router();
const wrapAsync = require("../Error/Error.js");
const { IsLoggedIn } = require("../MiddleWares.js");
const ListingFromController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//See Listing Main Page
router.get("/", ListingFromController.index);
router.route("/new").get(IsLoggedIn, ListingFromController.newListForm).post(upload.single("image"), wrapAsync(ListingFromController.acceptNewList));
//View Specific List
router.get("/:id", ListingFromController.viewList);
//Edit GET Route
router.get("/edit/:id", IsLoggedIn, wrapAsync(ListingFromController.renderEdit));
//Edit Post Route
router.put("/edit/:id", upload.single("image"), ListingFromController.acceptEditList);
//Delete Route
router.delete("/remove/:id", IsLoggedIn, wrapAsync(ListingFromController.destroyList));
module.exports = router;

// const listingValidate = (req, res, next) => {
//       let { error } = ListingSchema.validate(req.body);
//       if (error) {
//             let AllDetail = error.details.map((el) => el.message).join(",");
//             throw new ExpressError(404, AllDetail);
//       }
// };
