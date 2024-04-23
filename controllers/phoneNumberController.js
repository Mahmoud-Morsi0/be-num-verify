const PhoneNumber = require("../models/PhoneNumber");
const axios = require("axios");

exports.getAllNumbers = async (req, res) => {
  try {
    const allPhoneNumbers = await PhoneNumber.find().sort({
      date: -1,
    });
    res.json(allPhoneNumbers);
  } catch (error) {
    console.error("Can't get all numbers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.verifyNumber = async (req, res) => {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: "Number is required" });
  }

  const url = `http://apilayer.net/api/validate?access_key=${process.env.NUM_VERIFY_ACCESS_KEY}&number=${number}`;

  try {
    //GET PAYLOAD FROM NUM VERIFY
    const response = await axios.get(url);

    //CHECK IF NUMBER EXISTS
    let existsPhoneNumber = await PhoneNumber.findOne({
      number: response.data.number,
    });
    //SAVE PAYLOAD ONLY IF PHON NUMBER IS NEW
    if (!existsPhoneNumber) {
      //SAVE PAYLOAD TO MONGODB
      const newPhoneNumber = new PhoneNumber(response.data);
      await newPhoneNumber.save();
      return res.json(newPhoneNumber);
    } else {
      return res.json(existsPhoneNumber);
    }
  } catch (error) {
    console.error("Found error with the number:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
