const mongoose = require("mongoose");

const phoneNumberSchema = new mongoose.Schema({
  number: String,
  local_format: String,
  international_format: String,
  country_prefix: String,
  country_code: String,
  country_name: String,
  location: String,
  carrier: String,
  line_type: String,
  valid: Boolean,
  date: { type: Date, default: Date.now },
});

const PhoneNumber = mongoose.model("PhoneNumber", phoneNumberSchema);

module.exports = PhoneNumber;
