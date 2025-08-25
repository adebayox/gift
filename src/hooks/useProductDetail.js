import { useState, useEffect } from "react";
import { api } from "../services/api.js";

// product details hook
export const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const productData = await api.getProductById(id);
      setProduct(productData);
    } catch (err) {
      setError("Product not found or failed to load.");
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const retry = () => {
    fetchProduct();
  };

  return {
    product,
    loading,
    error,
    retry,
  };
};
