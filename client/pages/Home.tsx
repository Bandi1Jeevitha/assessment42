import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import Header from "@/components/Header";

interface Experience {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  duration: string;
}

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/experiences");
      if (!response.ok) throw new Error("Failed to fetch experiences");
      const data = await response.json();
      setExperiences(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((experience) => (
              <Link
                key={experience.id}
                to={`/details/${experience.id}`}
                className="group"
              >
                <div className="bg-white rounded overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative overflow-hidden h-48 bg-gray-200">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                      {experience.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">
                        {experience.location}
                      </span>
                    </div>

                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                      {experience.description}
                    </p>

                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(experience.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {experience.rating}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-600">From</p>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{experience.price}
                        </p>
                      </div>
                    </div>

                    <button className="w-full bg-yellow-400 text-black font-semibold py-2 rounded text-sm hover:bg-yellow-500 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && experiences.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No experiences found</p>
          </div>
        )}
      </main>
    </div>
  );
}
