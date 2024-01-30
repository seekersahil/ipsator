import { SortOption } from "./paginator.types";

export const findUnique = (array: Array<any>): Array<any> =>
  Array.from(new Set(array));

export const sortOptions: SortOption[] = [
  {
    label: "Price (Ascending)",
    value: "price-asc",
  },
  {
    label: "Price (Descending)",
    value: "price-desc",
  },
];
