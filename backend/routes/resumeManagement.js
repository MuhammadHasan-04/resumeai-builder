import express from "express";
import {
  getGeneratedResume,
  createResume,
  updateResume,
  deleteResume,
} from "../controller/ResumeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const route = express.Router();

route.get("/", authMiddleware, getGeneratedResume);
route.post("/create", authMiddleware, createResume);
route.put("/:id", authMiddleware, updateResume);
route.delete("/:id", authMiddleware, deleteResume);

export default route;
