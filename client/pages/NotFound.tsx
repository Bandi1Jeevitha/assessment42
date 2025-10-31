import { Link } from "react-router-dom";
import Header from "@/components/Header";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <Link
            to="/"
            className="text-yellow-500 hover:text-yellow-600 underline font-semibold"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
