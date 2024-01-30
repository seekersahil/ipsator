import Image from "next/image";
import { ProductCardProps } from "./ProductCard.types";

const ProductCard = (props: ProductCardProps) => {
  const { name, photo_url, price, description, category } = props;
  return (
    <div className="border-2 border-black rounded-lg p-6 flex flex-col gap-3 place-content-center place-items-center">
      <Image src={photo_url} alt={name} width={300} height={300} />
      <div className="metadata flex justify-between w-full">
        <h1 className="font-bold">{name}</h1>
        <h3>₹ {price}</h3>
      </div>
      <p className="font-light">{description}</p>
      <p className="text-sm">
        Category: <span className="uppercase font-bold">{category}</span>
      </p>
    </div>
  );
};

export default ProductCard;
