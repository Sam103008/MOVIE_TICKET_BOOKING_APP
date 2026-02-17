const router = require("express").Router();
const Show = require("../models/Show");

router.get("/", async (req, res) => {
  const { movieId, city, date } = req.query;
  const q = {};
  if (movieId) q.movieId = movieId;
  if (date) q.date = date;

  let shows = await Show.find(q).populate("theatreId").populate("movieId").sort({ time: 1 });

  if (city) shows = shows.filter(s => (s.theatreId?.city || "").toLowerCase() === String(city).toLowerCase());

  res.json(shows);
});

router.get("/:id", async (req, res) => {
  const show = await Show.findById(req.params.id).populate("theatreId").populate("movieId");
  if (!show) return res.status(404).json({ message: "Not found" });
  res.json(show);
});

module.exports = router;
