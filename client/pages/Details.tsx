import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Clock, Users, Star } from "lucide-react";
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
            <p className="text-red-700 mb-4">{error || "Experience not found"}</p>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Back to Experiences
            </Link>
          </div>
        </main>
      </div>
    );
  }

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
            <div className="mb-8">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {experience.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-slate-900">
                    {experience.rating}
                  </span>
                  <span className="text-slate-600">
                    ({experience.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-5 h-5 text-slate-500" />
                  <span>{experience.location}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-5 h-5 text-slate-500" />
                  <span>{experience.duration}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-700">
                  <Users className="w-5 h-5 text-slate-500" />
                  <span>Up to {experience.maxParticipants} people</span>
                </div>
              </div>

              <p className="text-lg text-slate-700 mb-8">
                {experience.longDescription}
              </p>

              {experience.highlights.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {experience.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-slate-700"
                      >
                        <span className="text-blue-600 font-bold mt-1">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-slate-50 rounded-lg border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Select Your Slot
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Available Dates & Times
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot.id)}
                      disabled={slot.available === 0}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                        selectedSlot === slot.id
                          ? "border-blue-600 bg-blue-50"
                          : slot.available === 0
                          ? "border-slate-200 bg-slate-100 opacity-50 cursor-not-allowed"
                          : "border-slate-200 hover:border-blue-600"
                      }`}
                    >
                      <div className="font-semibold text-slate-900">
                        {new Date(slot.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-sm text-slate-600">
                        {slot.time}
                        {slot.available === 0 ? " - Sold Out" : ""}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Number of Participants
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setParticipants(Math.max(1, participants - 1))
                    }
                    className="w-10 h-10 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-semibold"
                  >
                    −
                  </button>
                  <span className="text-xl font-semibold text-slate-900">
                    {participants}
                  </span>
                  <button
                    onClick={() =>
                      setParticipants(
                        Math.min(experience.maxParticipants, participants + 1)
                      )
                    }
                    className="w-10 h-10 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Price per person</span>
                  <span className="font-semibold text-slate-900">
                    ${experience.price}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${experience.price * participants}
                  </span>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={!selectedSlot}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
