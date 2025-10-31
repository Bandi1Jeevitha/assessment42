import { RequestHandler } from "express";
import { validatePromoCode } from "../data/promos";

export const handleValidatePromo: RequestHandler = (req, res) => {
  try {
    const { code, totalPrice } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ error: "Promo code is required", message: "Please enter a promo code" });
    }

    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({
        error: "Invalid total price",
        message: "Total price must be greater than 0",
      });
    }

    const result = validatePromoCode(code);

    if (!result.valid) {
      return res.status(400).json({
        error: "Invalid promo code",
        message: result.message || "This promo code cannot be used",
      });
    }

    const discountAmount = (totalPrice * result.discountPercentage!) / 100;
    const finalPrice = totalPrice - discountAmount;

    res.json({
      valid: true,
      code: code.toUpperCase(),
      discountPercentage: result.discountPercentage,
      discountAmount: Math.round(discountAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      message: `${result.discountPercentage}% discount applied!`,
    });
  } catch (error) {
    console.error("Promo validation error:", error);
    res.status(500).json({
      error: "Failed to validate promo code",
      message: "An error occurred while validating the promo code",
    });
  }
};
