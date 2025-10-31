export interface PromoCode {
  code: string;
  discountPercentage: number;
  maxUses: number;
  used: number;
  expiresAt: Date;
}

const promoCodes: Map<string, PromoCode> = new Map([
  [
    "SAVE10",
    {
      code: "SAVE10",
      discountPercentage: 10,
      maxUses: 100,
      used: 15,
      expiresAt: new Date("2025-12-31"),
    },
  ],
  [
    "FLAT100",
    {
      code: "FLAT100",
      discountPercentage: 15,
      maxUses: 50,
      used: 10,
      expiresAt: new Date("2025-06-30"),
    },
  ],
  [
    "WELCOME20",
    {
      code: "WELCOME20",
      discountPercentage: 20,
      maxUses: 200,
      used: 45,
      expiresAt: new Date("2025-03-31"),
    },
  ],
  [
    "SUMMER25",
    {
      code: "SUMMER25",
      discountPercentage: 25,
      maxUses: 75,
      used: 60,
      expiresAt: new Date("2025-08-31"),
    },
  ],
]);

export function validatePromoCode(code: string): {
  valid: boolean;
  discountPercentage?: number;
  message?: string;
} {
  const promo = promoCodes.get(code.toUpperCase());

  if (!promo) {
    return { valid: false, message: "Promo code not found" };
  }

  if (promo.used >= promo.maxUses) {
    return { valid: false, message: "Promo code has reached max uses" };
  }

  if (new Date() > promo.expiresAt) {
    return { valid: false, message: "Promo code has expired" };
  }

  return { valid: true, discountPercentage: promo.discountPercentage };
}

export function usePromoCode(code: string): void {
  const promo = promoCodes.get(code.toUpperCase());
  if (promo) {
    promo.used += 1;
  }
}
