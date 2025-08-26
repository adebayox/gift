import React from "react";
import { Link } from "react-router-dom";
import { MapPin, CreditCard, Tag } from "lucide-react";

// product card component

const ProductCard = ({ product }) => {
  if (!product) {
    return (
      <div className="bg-gray-200 rounded-lg p-4 animate-pulse">
        <div className="h-32 sm:h-40 md:h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 rounded mb-4 w-3/4"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden w-full max-w-sm mx-auto sm:max-w-none">
      <div className="relative h-32 sm:h-40 md:h-48 lg:h-52 bg-gray-200">
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-semibold shadow-md">
          {product.currency || "USD"} {product.maxPrice || 0}
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-5">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {product.merchant || "Unknown Merchant"}
        </h3>

        {product.description ? (
          <div className="mb-3 sm:mb-4">
            <a
              href={product.description}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
            >
              Description
            </a>
          </div>
        ) : (
          <p className="text-gray-600 text-xs sm:text-sm mb-3">
            No description available
          </p>
        )}

        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
            <span className="truncate">
              {product.minPrice === product.maxPrice
                ? `${product.currency || "USD"} ${product.maxPrice || 0}`
                : `${product.currency || "USD"} ${product.minPrice || 0} - ${
                    product.maxPrice || 0
                  }`}
            </span>
          </div>

          {product.category && (
            <div className="flex items-center text-xs sm:text-sm text-gray-500">
              <Tag className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
              <span className="capitalize truncate">{product.category}</span>
            </div>
          )}

          {product.country && (
            <div className="flex items-center text-xs sm:text-sm text-gray-500">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{product.country}</span>
            </div>
          )}
        </div>

        <Link
          to={`/products/${product.id}`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 block text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
