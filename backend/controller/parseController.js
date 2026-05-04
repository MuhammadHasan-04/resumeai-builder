import { extractFile } from "../utils/extractFile.js";
import { parseResumeAI } from "../services/aiService.js";

export const parseResume = async (req, res) => {
  try {
    console.log("[parseResume] request received");

    if (!req.file) {
      console.warn("[parseResume] no file uploaded");
      return res.status(400).json({ error: "No resume file uploaded" });
    }
    console.log("[parseResume] uploaded file:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    const resumeText = await extractFile(req.file);
    console.log("[parseResume] extracted text length:", resumeText?.length || 0);
    console.log("[parseResume] extracted text preview:", resumeText?.slice(0, 500) || "");

    const aiParsed = await parseResumeAI(resumeText);

    return res.status(200).json(aiParsed);
  } catch (error) {
    console.error("[parseResume] error:", error.message);
    return res.status(500).json({ error: "Failed to parse resume" });
  }
};
