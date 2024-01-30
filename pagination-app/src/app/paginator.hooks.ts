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

  const filterProducts = (products: Product[], filter?: string) =>
    setFilteredProducts(
      filter
        ? products.filter((product) => filter === product.category)
        : products
    );

  const fetchProducts = async ({ limit: number = 5, offset = 0 }) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.slingacademy.com/v1/sample-data/products?limit=${limit}&offset=${offset}`
      );
      const productsRes: ProductAPIModel = await res.json();
      setTotal(productsRes?.total_products || 0);
      setProducts(
        sortBy
          ? productsRes?.products.sort((a, b) =>
              sortBy.value === "price-desc"
                ? b.price - a.price
                : a.price - b.price
            )
          : productsRes?.products || []
      );
      setCategories(
        findUnique(productsRes?.products?.map((product) => product.category)) ||
          []
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const changeLimit = (limit: number) => setLimit(limit);
  const nextProducts = () => setOffset((prev) => prev + limit);
  const previousProducts = () =>
    setOffset((prev) => (prev - limit < 0 ? 0 : prev - limit));

  const allowPreviousProducts = offset >= 0;
  const allowNextProducts = offset + limit < total;
  const descriptionText = `Showing ${
    filter ? `${filter.toUpperCase()} products from` : ""
  } ${offset + 1} - ${limit + offset} of ${total} products ${
    sortBy ? `sorted by ${sortBy.label}` : ""
  }`;

  React.useEffect(() => {
    fetchProducts({ limit, offset });
  }, [limit, offset, sortBy]);

  React.useEffect(() => {
    filterProducts(products, filter);
  }, [products, filter]);

  console.log(sortBy);

  return {
    allowNextProducts,
    allowPreviousProducts,
    categories,
    changeLimit,
    descriptionText,
    filter,
    setFilter,
    filterProducts,
    filteredProducts,
    limit,
    loading,
    nextProducts,
    offset,
    previousProducts,
    setOffset,
    setSortBy,
    sortBy,
    total,
  };
};

export default usePaginator;
