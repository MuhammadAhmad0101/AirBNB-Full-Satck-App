const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewModel = require("./reviewsModel.js");
const ListingSchema = new Schema({
      title: {
            type: String,
            required: true,
      },
      description: String,
      price: Number,
      location: String,
      image: {
            url: String,
            fileName: String,
      },
      country: String,
      reviews: [
            {
                  type: Schema.Types.ObjectId,
                  ref: "Review",
            },
      ],
      owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
      },
});
ListingSchema.post("findOneAndDelete", async (listing) => {
      if (listing.reviews.length) {
            await ReviewModel.deleteMany({ _id: { $in: listing.reviews } });
      }
});
module.exports = mongoose.model("Listing", ListingSchema);
