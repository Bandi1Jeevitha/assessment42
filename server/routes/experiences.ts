import { RequestHandler } from "express";
import { getExperiences, getExperienceById } from "../data/experiences";

export const handleGetExperiences: RequestHandler = (_req, res) => {
  try {
    const experiences = getExperiences();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
};

export const handleGetExperienceDetails: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const experience = getExperienceById(id);

    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }

    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experience details" });
  }
};
