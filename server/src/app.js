import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import listingRoutes from "./routes/listing.routes.js";
import { deleteExpiredUsers } from "./jobs/deleteUsers.job.js";
//import { loginLimiter } from "./middleware/rateLimit.js";

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: "http://localhost:5173", // FRONTEND URL
    credentials: true, // COOKIES
  }),
);

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

//TEST LIMITER ENDPOINT
//app.post("/api/test-rate-limit", loginLimiter, (req, res) => {
//  res.json({ ok: true });
//});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api", listingRoutes);
app.use(express.json({ limit: "1mb" }));
//HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

// CRON ENDPOINT (Vercel will call this)
console.log("CRON RUN:", new Date().toISOString());
app.get("/api/cron/delete-users", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await deleteExpiredUsers();
    console.log("Cron: expired users deleted");
    res.json({ ok: true });
  } catch (err) {
    console.error("Cron error:", err);
    res.status(500).json({ ok: false });
  }
});

export default app;
