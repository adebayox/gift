import React from "react";
import ProductCard from "../components/cards/ProductCard.jsx";
import FilterBar from "../components/filters/FilterBar.jsx";
import Pagination from "../components/common/Pagination.jsx";
import Loading from "../components/common/Loading.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import { useProducts } from "../hooks/useProducts.js";
import { useCategories } from "../hooks/useCategories.js";
import { Package } from "lucide-react";

// product page

const ProductsPage = () => {
  const {
    products,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    retry,
  } = useProducts();
  const { categories } = useCategories();

  const handleSearchChange = (search) => {
    updateFilters({ search });
  };

  const handleCategoryChange = (category) => {
    updateFilters({ category });
  };

  const handleSortChange = (sortBy) => {
    updateFilters({ sortBy });
  };

  const handleSortOrderChange = () => {
    updateFilters({
      sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
    });
  };

  const handlePageChange = (page) => {
    updateFilters({ page });
  };

  const handleItemsPerPageChange = (limit) => {
    updateFilters({ limit });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Package className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Gift Cards & Rewards
          </h1>
        </div>
        <p className="text-gray-600">
          Discover amazing rewards and gift cards for your loyalty points
        </p>
      </div>

      <FilterBar
        searchTerm={filters.search}
        onSearchChange={handleSearchChange}
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
        sortBy={filters.sortBy}
        onSortChange={handleSortChange}
        sortOrder={filters.sortOrder}
        onSortOrderChange={handleSortOrderChange}
        categories={categories}
      />

      {loading && <Loading />}

      {error && <ErrorMessage message={error} onRetry={retry} />}

      {!loading && !error && (
        <>
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {pagination && pagination.totalPages > 1 && (
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={pagination.itemsPerPage}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  totalItems={pagination.totalItems}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
