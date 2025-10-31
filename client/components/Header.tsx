import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <MapPin className="w-6 h-6 text-gray-900" />
            <span className="text-xl font-bold text-gray-900">highway delite</span>
          </Link>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search experiences"
              className="px-4 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:border-yellow-400"
            />
            <button className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition-colors text-sm">
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
