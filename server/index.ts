import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleGetExperiences,
  handleGetExperienceDetails,
} from "./routes/experiences";
import { handleCreateBooking } from "./routes/bookings";
import { handleValidatePromo } from "./routes/promo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Demo route
  app.get("/api/demo", handleDemo);

  // Experiences routes
  app.get("/api/experiences", handleGetExperiences);
  app.get("/api/experiences/:id", handleGetExperienceDetails);

  // Bookings route
  app.post("/api/bookings", handleCreateBooking);

  // Promo code validation route
  app.post("/api/promo/validate", handleValidatePromo);

  return app;
}
