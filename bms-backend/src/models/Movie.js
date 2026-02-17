const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    language: { type: String, default: "Hindi" },
    genre: { type: [String], default: [] },
    durationMins: { type: Number, default: 120 },
    rating: { type: String, default: "UA" },
    posterUrl: { type: String, default: "/assets/posters/poster-1.jpg" },
    bannerUrl: { type: String, default: "/assets/banners/banner-1.jpg" },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
