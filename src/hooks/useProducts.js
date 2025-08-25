import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";

// useProduct hook
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sortBy: "name",
    sortOrder: "asc",
    page: 1,
    limit: 12,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.getProducts(filters);
      setProducts(response.products);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      // Reset page to 1 when filtering (except when explicitly changing page)
      page: newFilters.page !== undefined ? newFilters.page : 1,
    }));
  }, []);

  const retry = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    retry,
  };
};
