import { useLocation, Link } from "react-router-dom";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Header from "@/components/Header";

export default function Result() {
  const location = useLocation();
  const state = location.state || { success: false };

  const { success, bookingId, confirmation } = state;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!bookingId && !success && (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              No Booking Information
            </h1>
            <p className="text-slate-600 mb-8">
              Please complete a booking first to see the confirmation.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Experiences
            </Link>
          </div>
        )}

        {success && bookingId && (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Your experience has been successfully booked.
            </p>

            <div className="bg-slate-50 rounded-lg border border-slate-200 p-8 mb-8 text-left">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Booking ID</p>
                  <p className="text-2xl font-bold text-slate-900 break-all">
                    {bookingId}
                  </p>
                </div>

                {confirmation && (
                  <>
                    <div className="pt-6 border-t border-slate-200">
                      <p className="text-sm text-slate-600 mb-1">
                        Customer Name
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        {confirmation.firstName} {confirmation.lastName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600 mb-1">Email</p>
                      <p className="text-lg font-semibold text-slate-900">
                        {confirmation.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600 mb-1">Phone</p>
                      <p className="text-lg font-semibold text-slate-900">
                        {confirmation.phone}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-200">
                      <p className="text-sm text-slate-600 mb-1">
                        Number of Participants
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        {confirmation.participants}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600 mb-1">Total Amount</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${confirmation.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-slate-900 mb-2">What's Next?</h3>
              <ul className="space-y-2 text-slate-700">
                <li>✓ A confirmation email has been sent to your email address</li>
                <li>✓ You'll receive additional details about your experience</li>
                <li>
                  ✓ Keep your booking ID for check-in on the day of your
                  experience
                </li>
              </ul>
            </div>

            <Link
              to="/"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}

        {!success && bookingId && (
          <div className="text-center py-12">
            <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Booking Failed
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Unfortunately, your booking could not be completed. Please try
              again.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <p className="text-red-700">
                {confirmation?.message ||
                  "An error occurred during the booking process."}
              </p>
            </div>

            <Link
              to="/"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Experiences
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
