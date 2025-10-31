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
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Discover Experiences
          </h1>
          <p className="text-lg text-slate-600">
            Explore amazing travel experiences and book your next adventure
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((experience) => (
              <Link
                key={experience.id}
                to={`/details/${experience.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden h-64 bg-slate-200">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
                      {experience.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {experience.description}
                    </p>

                    <div className="flex items-center gap-2 mb-3 text-sm text-slate-700">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span>{experience.location}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(experience.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        {experience.rating} ({experience.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">From</p>
                        <p className="text-2xl font-bold text-slate-900">
                          ${experience.price}
                        </p>
                      </div>
                      <span className="text-sm text-slate-600 text-right">
                        {experience.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && experiences.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No experiences found</p>
          </div>
        )}
      </main>
    </div>
  );
}
