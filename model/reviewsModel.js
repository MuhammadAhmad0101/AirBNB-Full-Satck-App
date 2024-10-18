const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
      opinion: String,
      rating: {
            type: Number,
            min: 1,
            max: 5,
      },
      author: {
            type: Schema.Types.ObjectId,
            ref: "User",
      },
      createdAt: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("Review", ReviewSchema);
