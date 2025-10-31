import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  const {
    experienceId = "",
    slotId = "",
    participants = 1,
    price = 0,
  } = state;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreeTerms, setAgreeTerms] = useState(false);

  const totalPrice = price * participants;
  const discountAmount = (totalPrice * discount) / 100;
  const finalPrice = totalPrice - discountAmount;

  const validatePromoCode = async () => {
    if (!promo.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    setLoading(true);
    setPromoError("");
    setPromoSuccess("");

    try {
      const response = await fetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promo, totalPrice }),
      });

      const data = await response.json();

      if (!response.ok) {
        setPromoError(data.message || "Invalid promo code");
        setDiscount(0);
      } else {
        setDiscount(data.discountPercentage || 0);
        setPromoSuccess(`Applied! ${data.discountPercentage}% discount`);
      }
    } catch (err) {
      setPromoError("Failed to validate promo code");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";
    if (!agreeTerms) newErrors.terms = "You must agree to terms and safety policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const [firstName, ...lastNameParts] = fullName.trim().split(" ");
      const lastName = lastNameParts.join(" ") || "";

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceId,
          slotId,
          participants,
          firstName,
          lastName,
          email,
          phone: "",
          totalPrice: Math.round(finalPrice * 100) / 100,
          discountApplied: discount,
          promoCode: promo || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.message || "Booking failed" });
      } else {
        navigate("/result", {
          state: {
            success: true,
            bookingId: data.bookingId,
            confirmation: data,
          },
        });
      }
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : "An error occurred",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Checkout
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded">
                  <p className="text-red-700 text-sm">{errors.submit}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className={`w-full px-4 py-2 rounded border-2 focus:outline-none transition-colors text-sm ${
                    errors.fullName
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-yellow-400"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your name"
                  className={`w-full px-4 py-2 rounded border-2 focus:outline-none transition-colors text-sm ${
                    errors.email
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-yellow-400"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Promo code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value.toUpperCase())}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-2 rounded border-2 border-gray-300 focus:outline-none focus:border-yellow-400 text-sm"
                  />
                  <button
                    type="button"
                    onClick={validatePromoCode}
                    disabled={loading}
                    className="px-6 py-2 bg-black text-white font-semibold rounded text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-red-600 text-xs mt-1">{promoError}</p>
                )}
                {promoSuccess && (
                  <p className="text-green-600 text-xs mt-1">{promoSuccess}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-gray-700 cursor-pointer">
                  I agree to the terms and safety policy
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-600 text-xs">{errors.terms}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-500 transition-colors disabled:opacity-50 text-sm"
              >
                {submitting ? "Processing..." : "Pay and Confirm"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white border border-gray-200 rounded p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Experience</span>
                  <span className="text-gray-900 font-semibold">{experienceId ? `Experience ${experienceId}` : "-"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date</span>
                  <span className="text-gray-900 font-semibold">{slotId ? "2025-10-22" : "-"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time</span>
                  <span className="text-gray-900 font-semibold">09:00 am</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Qty</span>
                  <span className="text-gray-900 font-semibold">{participants}</span>
                </div>
              </div>

              <div className="space-y-3 pb-4 border-b border-gray-200 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-semibold">₹{Math.round(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="text-gray-900 font-semibold">₹50</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  ₹{Math.round(finalPrice + 50)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
