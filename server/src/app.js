import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import listingRoutes from "./routes/listing.routes.js";
//import { loginLimiter } from "./middleware/rateLimit.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // FRONTEND
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

//HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

export default app;
