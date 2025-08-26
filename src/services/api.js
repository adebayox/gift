import { publicFetch, privateFetch } from "../utility/fetchFunction";

const transformProduct = (apiProduct) => {
  const transformed = {
    id: apiProduct._id,
    name: apiProduct.description || `${apiProduct.merchant} Gift Card`,
    value: apiProduct.maxPrice,
    description:
      apiProduct.description ||
      `${apiProduct.merchant} gift card for ${
        Array.isArray(apiProduct.country)
          ? apiProduct.country.join(", ")
          : apiProduct.country
      }`,
    category: Array.isArray(apiProduct.category)
      ? apiProduct.category[0]
      : apiProduct.category,
    image: getProductImage(apiProduct.merchant, apiProduct.category),
    merchant: apiProduct.merchant,
    productCode: apiProduct.productCode,
    country: Array.isArray(apiProduct.country)
      ? apiProduct.country.join(", ")
      : apiProduct.country,
    currency: apiProduct.currency,
    minPrice: apiProduct.minPrice,
    maxPrice: apiProduct.maxPrice,
    denominations: apiProduct.denominations,
    termsAndConditions: apiProduct.termsAndConditions,
    redemption: apiProduct.redemption,
  };

  return transformed;
};

const getProductImage = (merchant, category) => {
  const imageMap = {};

  const categoryImages = {};

  if (!merchant) {
    return "";
  }

  const merchantLower = merchant.toLowerCase();

  const merchantKey = Object.keys(imageMap).find(
    (key) => merchantLower.includes(key) || key.includes(merchantLower)
  );

  if (merchantKey && imageMap[merchantKey]) {
    return imageMap[merchantKey];
  }

  if (category) {
    const categoryLower = Array.isArray(category)
      ? category[0]?.toLowerCase()
      : category.toLowerCase();

    const categoryKey = Object.keys(categoryImages).find(
      (key) => categoryLower.includes(key) || key.includes(categoryLower)
    );

    if (categoryKey && categoryImages[categoryKey]) {
      return categoryImages[categoryKey];
    }
  }
};

export const api = {
  // Get all products with pagination
  getProducts: async ({ page = 1, limit = 12 } = {}) => {
    try {
      console.log("Fetching products - page:", page, "limit:", limit);

      const response = await privateFetch.get("/business/products", {
        params: { page, limit },
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      });

      console.log("Products API response:", response.data);

      if (!response.data || !response.data.products) {
        throw new Error("Invalid API response structure");
      }

      const products = response.data.products.map(transformProduct);

      return {
        products: products,
        pagination: {
          currentPage: response.data.page || page,
          totalPages:
            response.data.totalPages ||
            Math.ceil((response.data.total || products.length) / limit),
          totalItems: response.data.total || products.length,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  },

  searchProducts: async ({
    merchant = "",
    category = "",
    useCase = "",
    page = 1,
    limit = 12,
  } = {}) => {
    try {
      console.log("Searching products:", {
        merchant,
        category,
        useCase,
        page,
        limit,
      });

      const params = { page, limit };

      if (merchant) params.merchant = merchant;
      if (category) params.category = category;
      if (useCase) params.useCase = useCase;

      const response = await privateFetch.get("/business/products/search", {
        params,
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      });

      console.log("Search API response:", response.data);

      if (!response.data || !response.data.products) {
        throw new Error("Invalid search API response structure");
      }

      const products = response.data.products.map(transformProduct);

      return {
        products: products,
        pagination: {
          currentPage: response.data.page || page,
          totalPages:
            response.data.totalPages ||
            Math.ceil((response.data.total || products.length) / limit),
          totalItems: response.data.total || products.length,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error searching products:", error);
      throw new Error("Failed to search products");
    }
  },

  getProductsWithSearch: async ({
    search = "",
    category = "",
    sortBy = "name",
    sortOrder = "asc",
    page = 1,
    limit = 12,
  } = {}) => {
    try {
      let response;

      if (search || category) {
        response = await api.searchProducts({
          merchant: search,
          category: category,
          page,
          limit,
        });
      } else {
        response = await api.getProducts({ page, limit });
      }

      let products = response.products;

      products.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === "value") {
          aValue = a.maxPrice;
          bValue = b.maxPrice;
        }

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sortOrder === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });

      return {
        products: products,
        pagination: response.pagination,
      };
    } catch (error) {
      console.error("Error fetching products with search:", error);
      throw new Error("Failed to fetch products");
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await privateFetch.get("/business/products", {
        params: { limit: 50 }, // Get more products to find the one we need
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      });

      const product = response.data.products.find((p) => p._id === id);
      if (!product) {
        throw new Error("Product not found");
      }

      return transformProduct(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      throw new Error("Product not found");
    }
  },

  // Get available filters
  getFilters: async () => {
    try {
      console.log("Fetching filters from API");

      const response = await privateFetch.get("/business/products/filters", {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      });

      console.log("Filters API response:", response.data);

      return {
        categories: response.data.categories || [],
        merchants: response.data.merchants || [],
        allowedCountries: response.data.allowedCountries || [],
      };
    } catch (error) {
      console.error("Error fetching filters:", error);
      return {
        categories: [],
        merchants: [],
        allowedCountries: [],
      };
    }
  },

  // Get unique categories
  getCategories: async () => {
    try {
      const filters = await api.getFilters();
      return filters.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  // Get unique merchants
  getMerchants: async () => {
    try {
      const filters = await api.getFilters();
      return filters.merchants;
    } catch (error) {
      console.error("Error fetching merchants:", error);
      return [];
    }
  },
};
