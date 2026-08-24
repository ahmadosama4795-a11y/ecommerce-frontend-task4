import { createContext, useContext, useEffect, useState } from "react";
import { products as seedProducts } from "../data/products";
import { categories as seedCategories } from "../data/categories";
const CatalogContext = createContext(null);
const read = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : fallback; } catch { return fallback; } };
export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(() => read("ecommerce_products", seedProducts));
  const [categories, setCategories] = useState(() => read("ecommerce_categories", seedCategories));
  useEffect(() => localStorage.setItem("ecommerce_products", JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem("ecommerce_categories", JSON.stringify(categories)), [categories]);
  const saveProduct = (product) => setProducts((items) => { const next = { ...product, id: product.id || Date.now(), price: Number(product.price), stockQuantity: Math.max(0, Number(product.stockQuantity)) }; return items.some((item) => item.id === next.id) ? items.map((item) => item.id === next.id ? next : item) : [...items, next]; });
  const toggleProduct = (id) => setProducts((items) => items.map((item) => item.id === id ? { ...item, isActive: !item.isActive } : item));
  const saveCategory = (category) => setCategories((items) => items.some((item) => item.id === category.id) ? items.map((item) => item.id === category.id ? category : item) : [...items, { ...category, id: Date.now() }]);
  return <CatalogContext.Provider value={{ products, categories, saveProduct, toggleProduct, saveCategory }}>{children}</CatalogContext.Provider>;
}
export const useCatalog = () => useContext(CatalogContext);
