const Joi = require("joi");
module.exports.ListingSchema = Joi.object({
      listing: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required().min(0),
            loaction: Joi.string().required(),
            country: Joi.string().required(),
      }).required(),
});
module.exports.ReviewValidationSchema = Joi.object({
      opinion: Joi.string().required(),
      rating: Joi.number().required().min(1).max(5),
});
