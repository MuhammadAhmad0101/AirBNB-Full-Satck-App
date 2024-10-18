const ListingModel = require("../model/listingModel.js");
const mongoose = require("mongoose"); //Mongoose
const Data = require("./SampleData.js"); //Sample Data
//Mongoose Connection
main().catch((err) => console.log(err));

async function main() {
      await mongoose.connect("mongodb://127.0.0.1:27017/AirBnb");
}
const initSampleData = async () => {
      const ownerId = new mongoose.Types.ObjectId("670d4ffba9460e393b5d5680");
      Data.sampleListings = Data.sampleListings.map((eachListing) => ({ ...eachListing, owner: ownerId }));
      await ListingModel.insertMany(Data.sampleListings);
      console.log(Data.sampleListings);
};
initSampleData();
