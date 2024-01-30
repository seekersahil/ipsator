import React from "react";

const InfoCard = () => (
  <p className="z-50 fixed left-0 top-0 flex border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 px-4 flex-wrap w-full justify-center">
    <span className="px-2">Dummy API&nbsp;</span>
    <span className="font-mono font-bold text-wrap px-2 text-center">
      https://api.slingacademy.com/v1/sample-data/products
    </span>
  </p>
);

export default InfoCard;
