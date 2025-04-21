
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-9xl font-bold text-waterfall-700">404</h1>
        <div className="relative">
          <div className="h-1.5 bg-waterfall-600 w-1/2 mx-auto my-6"></div>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-waterfall-50 px-4">
            <span className="text-waterfall-700 font-medium">Page Not Found</span>
          </div>
        </div>
        <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white">
              Back to Home
            </Button>
          </Link>
          <Link to="/hotels">
            <Button variant="outline">Browse Hotels</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
