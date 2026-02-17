require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

const authRoutes = require("./routes/auth.routes");
const moviesRoutes = require("./routes/movies.routes");
const showsRoutes = require("./routes/shows.routes");
const bookingsRoutes = require("./routes/bookings.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

app.get("/", (req, res) => res.json({ ok: true, name: "BMS API" }));

app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/shows", showsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 9000;

connectDB(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`✅ API running on :${PORT}`)))
  .catch((e) => {
    console.error("❌ DB error", e);
    process.exit(1);
  });
