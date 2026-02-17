const router = require("express").Router();
const { auth } = require("../middleware/auth");
const Show = require("../models/Show");
const Booking = require("../models/Booking");

router.post("/", auth, async (req, res) => {
  const { showId, seats } = req.body;
  if (!showId || !Array.isArray(seats) || seats.length === 0) return res.status(400).json({ message: "Invalid" });

  const show = await Show.findById(showId);
  if (!show) return res.status(404).json({ message: "Show not found" });

  const alreadyBooked = seats.some(s => show.seats.booked.includes(s));
  if (alreadyBooked) return res.status(409).json({ message: "Some seats already booked" });

  show.seats.booked.push(...seats);
  await show.save();

  const amount = seats.length * show.price;

  const booking = await Booking.create({
    userId: req.user.id,
    showId,
    seats,
    amount,
    status: "paid",
    paymentRef: "PAY_" + Math.random().toString(36).slice(2, 10).toUpperCase()
  });

  res.json(booking);
});

router.get("/me", auth, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id })
    .populate({ path: "showId", populate: ["movieId", "theatreId"] })
    .sort({ createdAt: -1 });

  res.json(bookings);
});

module.exports = router;
