import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <MapPin className="w-6 h-6 text-gray-900" />
            <span className="text-xl font-bold text-gray-900">
              highway delite
            </span>
          </Link>
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search experiences"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:border-yellow-400"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition-colors text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
