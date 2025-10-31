import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";

interface Experience {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  duration: string;
  maxParticipants: number;
  highlights: string[];
}

interface Slot {
  id: string;
  date: string;
  time: string;
  available: number;
}

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participants, setParticipants] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchExperienceDetails();
  }, [id]);

  const fetchExperienceDetails = async () => {
    try {
      const response = await fetch(`/api/experiences/${id}`);
      if (!response.ok) throw new Error("Failed to fetch experience details");
      const data = await response.json();
      setExperience(data);
      setSlots(data.availableSlots || []);
      if (data.availableSlots?.length > 0) {
        setSelectedSlot(data.availableSlots[0].id);
        setSelectedDate(data.availableSlots[0].date);
        setSelectedTime(data.availableSlots[0].time);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!selectedSlot) {
      setError("Please select a slot");
      return;
    }
    navigate("/checkout", {
      state: {
        experienceId: id,
        slotId: selectedSlot,
        participants,
        price: experience?.price,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-red-700 mb-4">
              {error || "Experience not found"}
            </p>
            <Link
              to="/"
              className="text-gray-900 hover:text-gray-700 font-semibold"
            >
              Back to Experiences
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const uniqueDates = Array.from(new Set(slots.map((s) => s.date)));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Details
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-96 object-cover rounded"
            />

            <h1 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {experience.title}
            </h1>

            <p className="text-gray-700 text-sm mb-6">
              {experience.longDescription}
            </p>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Choose date
              </h3>
              <div className="flex gap-2 flex-wrap">
                {uniqueDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      const slot = slots.find((s) => s.date === date);
                      if (slot) {
                        setSelectedSlot(slot.id);
                        setSelectedTime(slot.time);
                      }
                    }}
                    className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                      selectedDate === date
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Choose time
              </h3>
              <div className="flex gap-2 flex-wrap">
                {slots
                  .filter((s) => s.date === selectedDate)
                  .map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => {
                        setSelectedSlot(slot.id);
                        setSelectedTime(slot.time);
                      }}
                      disabled={slot.available === 0}
                      className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                        selectedSlot === slot.id
                          ? "bg-yellow-400 text-black"
                          : slot.available === 0
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {slot.time}
                      {slot.available === 0 ? " booked" : ""}
                    </button>
                  ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                About
              </h3>
              <p className="text-gray-700 text-sm">{experience.description}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white border border-gray-200 rounded p-6">
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Starts at</span>
                  <span className="font-bold text-gray-900">
                    ₹{experience.price}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setParticipants(Math.max(1, participants - 1))
                      }
                      className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm"
                    >
                      −
                    </button>
                    <span className="font-semibold text-gray-900">
                      {participants}
                    </span>
                    <button
                      onClick={() =>
                        setParticipants(
                          Math.min(
                            experience.maxParticipants,
                            participants + 1,
                          ),
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Subtotal</span>
                  <span className="font-bold text-gray-900">
                    ₹{experience.price * participants}
                  </span>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Taxes</span>
                  <span className="font-bold text-gray-900">₹50</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">
                    ₹{experience.price * participants + 50}
                  </span>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={!selectedSlot}
                className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
