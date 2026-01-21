import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

export default app;
