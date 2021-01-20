const mongoose = require("mongoose");


/*Mission Schema*/
const missionSchema = mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  transactions: [
    {
      id: {type: String, required: true},
      date: {type: Date, required: true},
      typeOfFees: {type: String, required: false},
      label: {type: String, required: false},
      amount: {type: Number, required: true},
      imagePath: {type: String, required: false},
      transactionType: {type: String, required: true},
      description: {type: String, required: false},
    }],
    status: { type: String, required: true }
});

module.exports = mongoose.model("Mission", missionSchema);
