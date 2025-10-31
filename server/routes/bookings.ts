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

    const missingFields: string[] = [];
    if (!experienceId || experienceId.trim() === "") missingFields.push("experienceId");
    if (!slotId || slotId.trim() === "") missingFields.push("slotId");
    if (!participants || participants < 1) missingFields.push("participants");
    if (!firstName || firstName.trim() === "") missingFields.push("firstName");
    if (!email || email.trim() === "") missingFields.push("email");

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    // Handle lastName being empty (single name users)
    const finalLastName = (lastName && lastName.trim() !== "") ? lastName.trim() : ".";

    if (!checkSlotAvailability(experienceId, slotId)) {
      return res.status(409).json({
        error: "Slot not available",
        message: "This slot has reached maximum capacity",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res
        .status(400)
        .json({
          error: "Invalid email format",
          message: "Please provide a valid email address",
        });
    }

    const booking = createBooking({
      experienceId,
      slotId,
      participants,
      firstName,
      lastName: finalLastName,
      email,
      phone,
      totalPrice,
      discountApplied: discountApplied || 0,
      promoCode: promoCode || null,
    });

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
    res.status(500).json({
      error: "Failed to create booking",
      message: "An error occurred while processing your booking",
    });
  }
};
