import { privateFetch } from "../utility/fetchFunction";

// api service

const transformProduct = (apiProduct) => ({
  id: apiProduct._id,
  name: apiProduct.description || `${apiProduct.merchant} Gift Card`,
  value: apiProduct.maxPrice,
  description:
    apiProduct.description ||
    `${apiProduct.merchant} gift card for ${apiProduct.country}`,
  category: Array.isArray(apiProduct.category)
    ? apiProduct.category[0]
    : apiProduct.category,
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
});

export const api = {
  getProducts: async ({
    search = "",
    category = "",
    sortBy = "name",
    sortOrder = "asc",
    page = 1,
    limit = 12,
  } = {}) => {
    try {
      const params = {
        page,
        limit,
      };

      if (search) {
        params.search = search;
      }

      if (category) {
        params.category = category;
      }

      if (sortBy) {
        params.sortBy = sortBy;
        params.sortOrder = sortOrder;
      }

      const response = await privateFetch.get("/business/products", {
        params,
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      });

      //   console.log("response:", response.data);

      if (!response.data || !response.data.products) {
        throw new Error("Invalid API response structure");
      }

      const products = response.data.products.map(transformProduct);
      //   console.log("Transformed products:", products);

      const paginationData = {
        currentPage: response.data.page || page,
        totalPages:
          response.data.totalPages ||
          Math.ceil((response.data.total || products.length) / limit),
        totalItems: response.data.total || products.length,
        itemsPerPage: limit,
      };

      return {
        products: products,
        pagination: paginationData,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  },

  getAllProducts: async () => {
    try {
      // Fetch all pages
      let allProducts = [];
      let page = 1;
      let totalPages = 1;

      do {
        const response = await privateFetch.get("/business/products", {
          params: { page, limit: 50 }, // Fetch more per page to reduce requests
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        });

        if (response.data && response.data.products) {
          allProducts = [
            ...allProducts,
            ...response.data.products.map(transformProduct),
          ];
          totalPages = response.data.totalPages || 1;
          page++;
        } else {
          break;
        }
      } while (page <= totalPages);

      return allProducts;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw new Error("Failed to fetch all products");
    }
  },

  // Client-side filtering
  getProductsWithClientFiltering: async ({
    search = "",
    category = "",
    sortBy = "name",
    sortOrder = "asc",
    page = 1,
    limit = 12,
  } = {}) => {
    try {
      const allProducts = await api.getAllProducts();

      let filteredProducts = allProducts;

      if (search) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase()) ||
            product.merchant.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category) {
        filteredProducts = filteredProducts.filter((product) => {
          const productCategory = Array.isArray(product.category)
            ? product.category[0]
            : product.category;
          return productCategory === category;
        });
      }

      // Apply sorting
      filteredProducts.sort((a, b) => {
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

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      return {
        products: paginatedProducts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredProducts.length / limit),
          totalItems: filteredProducts.length,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error fetching products with client filtering:", error);
      throw new Error("Failed to fetch products");
    }
  },

  getProductById: async (id) => {
    try {
      const response = await privateFetch.get("/business/products", {
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

  getCategories: async () => {
    try {
      const response = await privateFetch.get("/business/products", {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      });

      const categories = [];
      response.data.products.forEach((product) => {
        if (Array.isArray(product.category)) {
          categories.push(...product.category);
        } else if (product.category) {
          categories.push(product.category);
        }
      });

      return [...new Set(categories)].filter(Boolean);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },
};
