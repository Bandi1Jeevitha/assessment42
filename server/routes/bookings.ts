import { RequestHandler } from "express";
import { createBooking, checkSlotAvailability } from "../data/bookings";
import { usePromoCode } from "../data/promos";

export const handleCreateBooking: RequestHandler = (req, res) => {
  try {
    const {
      experienceId,
      slotId,
      participants,
      firstName,
      lastName,
      email,
      phone,
      totalPrice,
      discountApplied,
      promoCode,
    } = req.body;

    // Validate required fields
    if (
      !experienceId ||
      !slotId ||
      !participants ||
      !firstName ||
      !lastName ||
      !email ||
      !phone
    ) {
      return res
        .status(400)
        .json({ error: "Missing required fields", message: "All fields are required" });
    }

    // Check if slot is available
    if (!checkSlotAvailability(experienceId, slotId)) {
      return res.status(409).json({
        error: "Slot not available",
        message: "This slot has reached maximum capacity",
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res
        .status(400)
        .json({ error: "Invalid email format", message: "Please provide a valid email address" });
    }

    // Create the booking
    const booking = createBooking({
      experienceId,
      slotId,
      participants,
      firstName,
      lastName,
      email,
      phone,
      totalPrice,
      discountApplied,
      promoCode: promoCode || null,
    });

    // Mark promo code as used if provided
    if (promoCode) {
      usePromoCode(promoCode);
    }

    res.status(201).json({
      success: true,
      bookingId: booking.id,
      message: "Booking confirmed",
      firstName: booking.firstName,
      lastName: booking.lastName,
      email: booking.email,
      phone: booking.phone,
      participants: booking.participants,
      totalPrice: booking.totalPrice,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      error: "Failed to create booking",
      message: "An error occurred while processing your booking",
    });
  }
};
