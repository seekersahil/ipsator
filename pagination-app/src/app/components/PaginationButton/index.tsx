import React from "react";
import { PaginationButtonProps } from "./PaginationButton.types";

const PaginationButton = ({
  disabled,
  onClick,
  children,
}: PaginationButtonProps) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 cursor-pointer flex justify-center items-center disabled:hover:bg-inherit disabled:border-0 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

export default PaginationButton;
