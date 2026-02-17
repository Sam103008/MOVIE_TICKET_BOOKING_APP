const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { adminOnly } = require("../middleware/admin");
const Movie = require("../models/Movie");
const Theatre = require("../models/Theatre");
const Show = require("../models/Show");
const User = require("../models/User");

router.post("/bootstrap-admin", async (req, res) => {
  // first admin (one time)
  const { email } = req.body;
  const u = await User.findOne({ email });
  if (!u) return res.status(404).json({ message: "User not found" });
  u.role = "admin";
  await u.save();
  res.json({ message: "User promoted to admin" });
});

router.post("/movies", auth, adminOnly, async (req, res) => {
  const movie = await Movie.create(req.body);
  res.json(movie);
});

router.post("/theatres", auth, adminOnly, async (req, res) => {
  const theatre = await Theatre.create(req.body);
  res.json(theatre);
});

router.post("/shows", auth, adminOnly, async (req, res) => {
  const show = await Show.create(req.body);
  res.json(show);
});

router.get("/theatres", auth, adminOnly, async (req, res) => {
  const list = await Theatre.find().sort({ createdAt: -1 });
  res.json(list);
});

module.exports = router;
