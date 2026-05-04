import Resume from "../models/Resume.js";

const getGeneratedResume = async (req, res) => {
  try {
    const resumes = await Resume.findAll({
      where: { userId: req.user.userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createResume = async (req, res) => {
  try {
    const {
      title,
      template,
      personalInfo,
      experience,
      education,
      skills,
      projects,
    } = req.body;

    const resume = await Resume.create({
      title: title || "Untitled Resume",
      template: template || "default",
      personalInfo,
      experience,
      education,
      skills,
      projects,
      userId: req.user.userId,
    });

    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    const {
      title,
      template,
      personalInfo,
      experience,
      education,
      skills,
      projects,
    } = req.body;

    resume.title = title || resume.title;
    resume.template = template || resume.template;
    resume.personalInfo = personalInfo || resume.personalInfo;
    resume.experience = experience || resume.experience;
    resume.education = education || resume.education;
    resume.skills = skills || resume.skills;
    resume.projects = projects || resume.projects;

    await resume.save();
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    await resume.destroy();
    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getGeneratedResume, createResume, updateResume, deleteResume };
