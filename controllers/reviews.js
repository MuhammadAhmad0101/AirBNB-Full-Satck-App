const ListingModel = require("../model/listingModel");
const ReviewModel = require("../model/reviewsModel");

module.exports.acceptNewReview = async (req, res) => {
      let listing = await ListingModel.findById(req.params.id);
      let { opinion, rating } = req.body;
      let newReview = await ReviewModel.create({ opinion, rating });
      newReview.author = req.user._id;
      listing.reviews.push(newReview._id);
      await newReview.save();
      await listing.save();
      res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroyReview = async (req, res) => {
      let { id, reviewId } = req.params;
      await ListingModel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await ReviewModel.findByIdAndDelete(reviewId);
      res.redirect(`/listings/${id}`);
};
