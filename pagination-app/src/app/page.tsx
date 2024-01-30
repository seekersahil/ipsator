"use client";
import Image from "next/image";
import usePaginator from "./paginator.hooks";
import { ProductCard } from "./components";

export default function Home() {
  const {
    allowNextProducts,
    allowPreviousProducts,
    changeLimit,
    loading,
    nextProducts,
    previousProducts,
    products,
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
          </div>
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

      <div className="relative h-full flex w-full items-center justify-center flex-wrap gap-6 my-16 before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        {loading ? (
          <>Loading...</>
        ) : (
          products.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))
        )}
      </div>
    </main>
  );
}
