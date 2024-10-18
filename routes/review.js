const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Error/Error.js");
const ReviewController = require("../controllers/reviews.js");
//Accepting New Review
router.post("/", wrapAsync(ReviewController.acceptNewReview));
// Deleting Review using Delete Route
router.delete("/:reviewId", wrapAsync(ReviewController.destroyReview));
module.exports = router;
