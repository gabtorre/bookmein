const mongoose = require("mongoose");


// set up schema
const bookingSchema = new mongoose.Schema(
  {
    message: { type: String, required:true},
    dateTime: {type: String, required:true},
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
 
  
 },
  {
    timestamps: true, 

  }
);

// creates a model
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;