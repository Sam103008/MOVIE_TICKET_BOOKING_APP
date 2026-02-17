const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema(
  {
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    theatreId: { type: mongoose.Schema.Types.ObjectId, ref: "Theatre", required: true },
    date: { type: String, required: true },       // "2026-02-17"
    time: { type: String, required: true },       // "19:30"
    price: { type: Number, default: 180 },
    seats: {
      rows: { type: Number, default: 10 },
      cols: { type: Number, default: 14 },
      booked: { type: [String], default: [] }     // ["A1","A2"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Show", ShowSchema);
