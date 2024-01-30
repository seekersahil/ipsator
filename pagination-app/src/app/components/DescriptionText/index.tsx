import React from "react";
import { DescriptionTextProps } from "./DescriptionText.types";

const DescriptionText = ({ descriptionText }: DescriptionTextProps) => (
  <div className="mt-10 flex place-content-center place-items-center text-center lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left font-bold">
    {descriptionText}
  </div>
);

export default DescriptionText;
