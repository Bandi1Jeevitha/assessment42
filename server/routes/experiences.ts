import { RequestHandler } from "express";
import { getExperiences, getExperienceById } from "../data/experiences";

export const handleGetExperiences: RequestHandler = (req, res) => {
  try {
    const experiences = getExperiences();
    const searchQuery = req.query.search as string | undefined;

    if (searchQuery) {
      const lowerSearch = searchQuery.toLowerCase();
      const filtered = experiences.filter(
        (exp) =>
          exp.title.toLowerCase().includes(lowerSearch) ||
          exp.description.toLowerCase().includes(lowerSearch) ||
          exp.location.toLowerCase().includes(lowerSearch)
      );
      return res.json(filtered);
    }

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
