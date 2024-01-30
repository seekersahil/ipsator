"use client";
import Image from "next/image";
import usePaginator from "./paginator.hooks";
import { ProductCard } from "./components";

export default function Home() {
  const {
    allowNextProducts,
    allowPreviousProducts,
    categories,
    changeLimit,
    descriptionText,
    filter,
    filteredProducts,
    loading,
    nextProducts,
    previousProducts,
    setFilter,
  } = usePaginator();
  return (
    <main className="flex min-h-screen p-10 flex-col justify-between items-center">
      <div className="flex-col items-center justify-between w-full lg:max-w-7xl">
        <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 px-4">
            Dummy API&nbsp;
            <code className="font-mono font-bold text-wrap">
              https://api.slingacademy.com/v1/sample-data/products
            </code>
          </p>
          <div className="fixed bottom-0 left-0 flex h-16 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none">
            <select
              className="p-2"
              name="show"
              id="show"
              onChange={(e) => changeLimit(+e.target.value)}
            >
              {new Array(5).fill(1).map((_, index) => (
                <option
                  value={(index + 1) * 5}
                  key={`paginate-limit-${index}`}
                  defaultValue={5}
                >
                  Show {(index + 1) * 5} Products
                </option>
              ))}
            </select>
            <select
              disabled={loading}
              className="p-2 ml-5"
              name="show"
              onChange={(e) => setFilter(e.target.value)}
              id="show"
              defaultValue="Filter By Categories"
            >
              <option value={""} selected={!filter}>
                All categories
              </option>
              {Array.from(categories)?.map((category, index) => (
                <option
                  selected={filter === category}
                  value={category.toString()}
                  key={`paginate-limit-${index}`}
                  defaultValue={5}
                  className="uppercase"
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-24 lg:mt-10 flex place-content-center place-items-center text-center lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          {descriptionText}
        </div>
        <div className="mt-24 lg:mt-10 flex place-content-center place-items-center text-center lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <button
            disabled={!allowPreviousProducts}
            onClick={previousProducts}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 cursor-pointer flex justify-center items-center disabled:hover:bg-inherit disabled:border-0 disabled:cursor-not-allowed"
          >
            <h2
              className={`text-2xl font-semibold group-disabled:text-gray-500`}
            >
              <span className="inline-block transition-transform group-disabled:transform-none group-hover:translate-x-1 motion-reduce:transform-none">
                &lt;-
              </span>{" "}
              Previous
            </h2>
          </button>

          <button
            disabled={!allowNextProducts}
            onClick={nextProducts}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 cursor-pointer flex justify-center items-center disabled:hover:bg-inherit disabled:border-0 disabled:cursor-not-allowed"
          >
            <h2
              className={`text-2xl font-semibold group-disabled:text-gray-500`}
            >
              Next{" "}
              <span className="inline-block transition-transform group-disabled:transform-none group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
          </button>
        </div>
      </div>

      <div className="relative h-full flex w-full items-center justify-center flex-wrap gap-6 my-16 flex-auto">
        {loading ? (
          <>Loading...</>
        ) : filteredProducts.length > 0 ? (
          filteredProducts?.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))
        ) : (
          <>No Products Found</>
        )}
      </div>
    </main>
  );
}
