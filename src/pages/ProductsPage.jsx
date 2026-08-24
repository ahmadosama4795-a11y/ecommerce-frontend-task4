import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useCatalog } from "../context/CatalogContext";
import ProductCard from "../components/products/ProductCard";
import EmptyState from "../components/common/EmptyState";

function ProductsPage() {
  const { products, categories } = useCatalog();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [category, setCategory] = useState(() => searchParams.get("category") || "");
  const [maxPrice, setMaxPrice] = useState("");
  const [stockOnly, setStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  useEffect(() => { setSearch(searchParams.get("search") || ""); setCategory(searchParams.get("category") || ""); setVisibleCount(8); }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => product.isActive !== false);

    if (search.trim()) {
      const searchTerm = search.toLowerCase().trim();

      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    if (category) {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (maxPrice) {
      result = result.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    if (stockOnly) {
      result = result.filter(
        (product) => product.stockQuantity > 0
      );
    }

    if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, maxPrice, stockOnly, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const hasMoreProducts = visibleCount < filteredProducts.length;

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMaxPrice("");
    setStockOnly(false);
    setSortBy("");
    setVisibleCount(8);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setVisibleCount(8);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setVisibleCount(8);
  };

  const handlePriceChange = (event) => {
    setMaxPrice(event.target.value);
    setVisibleCount(8);
  };

  const handleStockChange = (event) => {
    setStockOnly(event.target.checked);
    setVisibleCount(8);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setVisibleCount(8);
  };

  const loadMore = () => {
    setVisibleCount((currentCount) => currentCount + 8);
  };

  return (
    <main className="container page-section">
      <div className="page-header">
        <h1>Products</h1>
        <p>Browse our technology products.</p>
      </div>

      <section className="filters">
        <div className="filter-group">
          <label htmlFor="product-search">Search</label>
          <input
            id="product-search"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">All categories</option>

            {categories.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="price-filter">Maximum Price</label>
          <input
            id="price-filter"
            type="number"
            min="0"
            placeholder="Any price"
            value={maxPrice}
            onChange={handlePriceChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="sort-filter">Sort By</label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="">Default</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
          </select>
        </div>

        <label className="stock-filter">
          <input
            type="checkbox"
            checked={stockOnly}
            onChange={handleStockChange}
          />
          In stock only
        </label>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </section>

      <div className="products-toolbar">
        <strong>
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </strong>

        {filteredProducts.length > 0 && (
          <span>
            Showing {visibleProducts.length} of {filteredProducts.length}
          </span>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          message="Try changing your search or filters."
        />
      ) : (
        <>
          <section className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </section>

          {hasMoreProducts && (
            <div className="load-more-container">
              <button
                type="button"
                className="btn btn-primary"
                onClick={loadMore}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default ProductsPage;
