const mongoose = require("mongoose");


// set up schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "You must provide a name."] },
    email: {type: String, required:[true, "You must provide an email."] },
    phoneNumber: {type: Number, required:[true, "You must provide a phone number."] },
    // array of bookings
    bookings: [ { type: mongoose.Schema.Types.ObjectId, ref: "Booking" } ]
 },
  {
    timestamps: true, 

  }
);

// creates a model
const User = mongoose.model("User", userSchema);

module.exports = User;