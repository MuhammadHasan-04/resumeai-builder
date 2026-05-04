import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import resumeRouter from "./routes/resumeManagement.js";
import resumeUploading from "./routes/resumeUploading.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Error handling for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format",
    });
  }
  next();
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api", resumeUploading);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
});
