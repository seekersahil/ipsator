import React from "react";
import { Product, ProductAPIModel } from "./paginator.types";

const usePaginator = () => {
  const [limit, setLimit] = React.useState<number>(5);
  const [offset, setOffset] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchProducts = async ({ limit: number = 5, offset = 0 }) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.slingacademy.com/v1/sample-data/products?limit=${limit}&offset=${offset}`
      );
      const productsRes: ProductAPIModel = await res.json();
      setTotal(productsRes.total_products);
      setProducts(productsRes.products);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const changeLimit = (limit: number) => setLimit(limit);
  const nextProducts = () => setOffset((prev) => prev + limit);
  const previousProducts = () => setOffset((prev) => prev - limit);

  const allowPreviousProducts = offset >= limit;
  const allowNextProducts = offset + limit < total;

  React.useEffect(() => {
    fetchProducts({ limit, offset });
  }, [limit, offset]);

  return {
    changeLimit,
    limit,
    loading,
    nextProducts,
    offset,
    previousProducts,
    products,
    setOffset,
    setProducts,
    allowNextProducts,
    allowPreviousProducts,
  };
};

export default usePaginator;
