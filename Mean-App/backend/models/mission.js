const mongoose = require("mongoose");

const missionSchema = mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  transactions: [
    {
      id: {type: String, required: true},
      date: {type: Date, required: true},
      typeOfFees: {type: String, required: true},
      label: {type: String, required: true},
      amount: {type: Number, required: true},
      imagePath: {type: String, required: true},
      transactionType: {type: String, required: true},
    }],
    status: { type: String, required: true }
});

module.exports = mongoose.model("Mission", missionSchema);
