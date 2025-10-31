import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, AlertCircle } from "lucide-react";
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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalPrice = price * participants;
  const discountAmount = (totalPrice * discount) / 100;
  const finalPrice = totalPrice - discountAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

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

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceId,
          slotId,
          participants,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          totalPrice: finalPrice,
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
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Experiences
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">
              Complete Your Booking
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700">{errors.submit}</p>
                </div>
              )}

              <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Your Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors ${
                        errors.firstName
                          ? "border-red-500 focus:border-red-600"
                          : "border-slate-200 focus:border-blue-600"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors ${
                        errors.lastName
                          ? "border-red-500 focus:border-red-600"
                          : "border-slate-200 focus:border-blue-600"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors ${
                      errors.email
                        ? "border-red-500 focus:border-red-600"
                        : "border-slate-200 focus:border-blue-600"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors ${
                      errors.phone
                        ? "border-red-500 focus:border-red-600"
                        : "border-slate-200 focus:border-blue-600"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Have a Promo Code?
                </h2>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value.toUpperCase())}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-200 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={validatePromoCode}
                    disabled={loading}
                    className="px-6 py-3 bg-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-300 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Validating..." : "Apply"}
                  </button>
                </div>

                {promoError && (
                  <p className="text-red-600 text-sm mt-2">{promoError}</p>
                )}
                {promoSuccess && (
                  <p className="text-green-600 text-sm mt-2">{promoSuccess}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-lg"
              >
                {submitting ? "Processing..." : "Complete Booking"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-slate-50 rounded-lg border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Price Summary
              </h2>

              <div className="space-y-4 pb-4 border-b border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    {participants} participant{participants > 1 ? "s" : ""} × $
                    {price}
                  </span>
                  <span className="font-semibold text-slate-900">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="py-4 flex justify-between items-end">
                <span className="text-lg font-semibold text-slate-900">
                  Total
                </span>
                <span className="text-3xl font-bold text-blue-600">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
