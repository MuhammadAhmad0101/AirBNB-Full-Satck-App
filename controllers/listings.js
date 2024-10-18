const ListingModel = require("../model/listingModel");

module.exports.index = async (req, res) => {
      let listing = await ListingModel.find();
      res.render("listing", { listing });
};
module.exports.viewList = async (req, res) => {
      let { id } = req.params;
      let listingItem = await ListingModel.findById(id)
            .populate({ path: "reviews", populate: { path: "author" } })
            .populate("owner");
      if (!listingItem) {
            req.flash("err", "That List Does Not exist ! ");
            res.redirect("/listings");
      }
      res.render("Show", { listingItem });
};

module.exports.renderEdit = async (req, res, next) => {
      let { id } = req.params;
      let listingItem = await ListingModel.findById(id);
      req.flash("err", "That List Does Not exist ! ");
      res.render("edit", { listingItem });
};

module.exports.destroyList = async (req, res) => {
      let { id } = req.params;
      await ListingModel.findByIdAndDelete(id);
      req.flash("listCreated", "Listing Deleted ! ");
      req.flash("err", "That List Does Not exist ! ");
      res.redirect("/listings");
};

module.exports.acceptEditList = async (req, res) => {
      let { title, price, description, location, country } = req.body;
      let { id } = req.params;
      let ForImageSaving = await ListingModel.findByIdAndUpdate(id, { title, price, description, location, country }, { new: true });
      if (req.file) {
            let url = req.file.path;
            let filename = req.file.originalname;
            ForImageSaving.image = { url, filename };
            ForImageSaving.save();
      }
      req.flash("listCreated", "Listing Updated ! ");
      res.redirect(`/listings`);
};

module.exports.newListForm = (req, res) => {
      res.render("newListing");
};

module.exports.acceptNewList = async (req, res) => {
      let { title, price, description, location, country } = req.body;
      let url = req.file.path;
      let filename = req.file.originalname;
      let newList = await ListingModel.create({
            title,
            price,
            description,
            location,
            country,
      });
      newList.owner = req.user;
      newList.image = { url, filename };
      newList.save();
      req.flash("listCreated", "New Listing Added ! ");
      res.redirect("/listings");
};
