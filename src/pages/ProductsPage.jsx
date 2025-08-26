import React from "react";
import ProductCard from "../components/cards/ProductCard.jsx";
import FilterBar from "../components/filters/FilterBar.jsx";
import Pagination from "../components/common/Pagination.jsx";
import Loading from "../components/common/Loading.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import { useProducts } from "../hooks/useProducts.js";
import { useCategories } from "../hooks/useCategories.js";
import { Package } from "lucide-react";

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
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-3 sm:mb-2">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
              <Package className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600 flex-shrink-0" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Gift Cards & Rewards
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Discover amazing rewards and gift cards for your loyalty points
          </p>
        </div>

        <div className="mb-6 sm:mb-8">
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
        </div>

        {loading && (
          <div className="flex justify-center py-8 sm:py-12">
            <Loading />
          </div>
        )}

        {error && (
          <div className="mb-6 sm:mb-8">
            <ErrorMessage message={error} onRetry={retry} />
          </div>
        )}

        {!loading && !error && (
          <>
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {pagination && pagination.totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={pagination.currentPage}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                      itemsPerPage={pagination.itemsPerPage}
                      onItemsPerPageChange={handleItemsPerPageChange}
                      totalItems={pagination.totalItems}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 sm:py-16 lg:py-20">
                <Package className="mx-auto h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-gray-400 mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto px-4">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
