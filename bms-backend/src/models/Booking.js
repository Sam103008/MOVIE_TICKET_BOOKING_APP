const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    showId: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
    seats: { type: [String], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "cancelled"], default: "paid" },
    paymentRef: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
