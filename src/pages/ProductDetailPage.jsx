import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Tag,
  Globe,
  FileText,
  ShoppingCart,
  Info,
} from "lucide-react";
import { api } from "../services/api";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

// product detail page
const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await api.getProductById(id);
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={product.image}
              //   alt={product.name}
              className="w-full h-96 lg:h-full object-cover"
              onError={(e) => {
                e.target.src = "";
              }}
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-lg">
              {product.currency} {product.maxPrice}
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.merchant}
            </h1>

            <p className="text-gray-600 text-lg mb-6">{product.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <CreditCard className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Price Range
                  </h3>
                  <p className="text-gray-600">
                    {product.minPrice === product.maxPrice
                      ? `${product.currency} ${product.maxPrice}`
                      : `${product.currency} ${product.minPrice} - ${product.maxPrice}`}
                  </p>
                </div>
              </div>

              {product.category && (
                <div className="flex items-start space-x-3">
                  <Tag className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Category
                    </h3>
                    <p className="text-gray-600 capitalize">
                      {product.category}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Available In
                  </h3>
                  <p className="text-gray-600">{product.country}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Product Code
                  </h3>
                  <p className="text-gray-600 font-mono text-sm">
                    {product.productCode}
                  </p>
                </div>
              </div>

              {product.redemption && (
                <div className="flex items-start space-x-3">
                  <Globe className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Redemption
                    </h3>
                    <p className="text-gray-600 capitalize">
                      {product.redemption}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Currency</h3>
                  <p className="text-gray-600">{product.currency}</p>
                </div>
              </div>
            </div>

            {product.denominations && product.denominations.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Available Denominations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.denominations.map((denomination, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {product.currency} {denomination}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Purchase Gift Card
              </button>

              <div className="grid grid-cols-2 gap-3">
                {product.termsAndConditions && (
                  <a
                    href={product.termsAndConditions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Terms & Conditions
                  </a>
                )}

                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  Save to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
