import express from "express";
import multer from "multer";
import { parseResume } from "../controller/parseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const allowedMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      return cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
    }
    cb(null, true);
  },
});

const validateUploadedFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Resume file is required",
    });
  }
  next();
};

router.post(
  "/parseResume",
  authMiddleware,
  upload.single("resume"),
  validateUploadedFile,
  parseResume,
);

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message:
        err.code === "LIMIT_FILE_SIZE"
          ? "File is too large. Maximum size is 5MB"
          : "Invalid file upload",
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Invalid file upload",
    });
  }

  next();
});

export default router;
