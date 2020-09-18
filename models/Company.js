const mongoose = require("mongoose");


// set up schema
const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "You must provide a name."] },
    address: {type: String, required:[true, "You must provide a address."] },
    phoneNumber: {type: Number, required:[true, "You must provide a phone number."] },
    email: {type: String, required:[true, "You must provide a email."] },
  
 },
  {
    timestamps: true, 

  }
);

// creates a model
const Company = mongoose.model("Company", employeeSchema);

module.exports = Company;