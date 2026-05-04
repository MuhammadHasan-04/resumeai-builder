import { DataTypes, DATE } from "sequelize";
import sequelize from "../config/db.js";
import User from "./Users.js";
const Resume = sequelize.define(
  "Resume",
  {
    title: { type: DataTypes.STRING, defaultValue: "Untitled Resume" },
    template: { type: DataTypes.STRING, defaultValue: "default" },
    personalInfo: { type: DataTypes.JSON },
    experience: { type: DataTypes.JSON },
    education: { type: DataTypes.JSON },
    skills: { type: DataTypes.JSON },
    projects: { type: DataTypes.JSON },
  },
  { timestamps: true },
);

User.hasMany(Resume, { foreignKey: "userId" });
Resume.belongsTo(User, { foreignKey: "userId" });
export default Resume;
