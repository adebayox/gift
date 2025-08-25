import React from "react";
import { Link } from "react-router-dom";
import { MapPin, CreditCard, Tag } from "lucide-react";

// product card component
const ProductCard = ({ product }) => {

  if (!product) {
    return <div className="bg-gray-200 rounded-lg p-4">Loading...</div>;
  }

  console.log("ProductCard received product:", product); // Debug log

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
 
      <div className="relative h-48 bg-gray-200">
        
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
          {product.currency || "USD"} {product.maxPrice || 0}
        </div>
      </div>

      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.merchant || "Unknown Merchant"}
        </h3>

        {product.description ? (
          <div className="grid grid-cols-2 gap-3">
            <a
              href={product.description}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Description
            </a>
          </div>
        ) : (
          <p className="text-gray-600 text-sm mb-3">No description available</p>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <CreditCard className="h-4 w-4 mr-2" />
            <span>
              {product.minPrice === product.maxPrice
                ? `${product.currency || "USD"} ${product.maxPrice || 0}`
                : `${product.currency || "USD"} ${product.minPrice || 0} - ${
                    product.maxPrice || 0
                  }`}
            </span>
          </div>

          {product.category && (
            <div className="flex items-center text-sm text-gray-500">
              <Tag className="h-4 w-4 mr-2" />
              <span className="capitalize">{product.category}</span>
            </div>
          )}

          {product.country && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{product.country}</span>
            </div>
          )}
        </div>

        <Link
          to={`/products/${product.id}`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 block text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
