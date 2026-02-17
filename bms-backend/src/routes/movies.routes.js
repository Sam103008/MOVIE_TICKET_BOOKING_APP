const router = require("express").Router();
const Movie = require("../models/Movie");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.json(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: "Not found" });
  res.json(movie);
});

module.exports = router;
