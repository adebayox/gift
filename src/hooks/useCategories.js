import { useState, useEffect } from "react";
import { api } from "../services/api";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [allowedCountries, setAllowedCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//   useCategory hook

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoading(true);
        setError(null);

        const filters = await api.getFilters();
        setCategories(filters.categories);
        setMerchants(filters.merchants);
        setAllowedCountries(filters.allowedCountries);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching filters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return {
    categories,
    merchants,
    allowedCountries,
    loading,
    error,
  };
};
