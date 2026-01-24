import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // FRONTEND
    credentials: true, // COOKIES
  }),
);

//Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

//Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});
app.use("/api/users", userRoutes);

export default app;
