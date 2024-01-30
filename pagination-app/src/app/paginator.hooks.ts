import React from "react";
import {
  Product,
  ProductAPIModel,
  ProductCategory,
  SortOption,
} from "./paginator.types";
import { findUnique } from "./paginator.helpers";

const usePaginator = () => {
  const [limit, setLimit] = React.useState<number>(5);
  const [offset, setOffset] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Array<ProductCategory>>(
    []
  );
  const [filter, setFilter] = React.useState<ProductCategory>("");
  const [sortBy, setSortBy] = React.useState<SortOption>();
  const [search, setSearch] = React.useState<string>("");
  const [error, setError] = React.useState<string | undefined>();

  const filterProducts = (products: Product[], filter?: string) => {
    setLoading(true);
    setFilteredProducts(
      filter
        ? products.filter((product) => filter === product.category)
        : products
    );
    setLoading(false);
  };

  const fetchProducts = async ({ limit: number = 5, offset = 0 }) => {
    setError(undefined);
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.slingacademy.com/v1/sample-data/products?limit=${limit}&offset=${offset}`
      );
      const productsRes: ProductAPIModel = await res.json();
      setTotal(productsRes?.total_products || 0);
      setProducts(
        productsRes?.products
          .sort((a, b) =>
            sortBy
              ? sortBy.value === "price-desc"
                ? b.price - a.price
                : a.price - b.price
              : 0
          )
          .filter(
            (product) =>
              product.name.toLowerCase().includes(search.toLowerCase()) ||
              product.description.toLowerCase().includes(search.toLowerCase())
          )
      );
      setCategories(
        findUnique(productsRes?.products?.map((product) => product.category)) ||
          []
      );
      setLoading(false);
    } catch (err) {
      setError("Something went wrong. Please try again!");
      setLoading(false);
    }
  };

  const changeLimit = (limit: number) => setLimit(limit);
  const nextProducts = () => setOffset((prev) => prev + limit);
  const previousProducts = () =>
    setOffset((prev) => (prev - limit < 0 ? 0 : prev - limit));

  const allowPreviousProducts = offset > 0;
  const allowNextProducts = offset + limit < total;

  const descriptionText = `${loading ? "Loading" : "Showing"} ${
    filter ? `${filter.toUpperCase()} products from` : ""
  } ${offset + 1} - ${limit + offset} of ${total} products ${
    sortBy ? `sorted by ${sortBy.label}` : ""
  } ${search ? `containing "${search}"` : ""}`;

  React.useEffect(() => {
    fetchProducts({ limit, offset });
  }, [limit, offset, sortBy]);

  // debouncing for search
  React.useEffect(() => {
    const searchProducts = setTimeout(() => {
      fetchProducts({ limit, offset });
    }, 300);
    return () => clearTimeout(searchProducts);
  }, [search]);

  React.useEffect(() => {
    filterProducts(products, filter);
  }, [products, filter]);

  return {
    allowNextProducts,
    allowPreviousProducts,
    categories,
    changeLimit,
    descriptionText,
    error,
    filter,
    setFilter,
    filterProducts,
    filteredProducts,
    limit,
    loading,
    nextProducts,
    offset,
    previousProducts,
    search,
    setOffset,
    setSearch,
    setSortBy,
    sortBy,
    total,
  };
};

export default usePaginator;
