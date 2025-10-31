import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";

export default function Result() {
  const location = useLocation();
  const state = location.state || { success: false };

  const { success, bookingId } = state;

  if (!success || !bookingId) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No booking information found</p>
            <Link
              to="/"
              className="text-yellow-500 hover:text-yellow-600 font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center w-full">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            Ref ID: {bookingId}
          </p>

          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
