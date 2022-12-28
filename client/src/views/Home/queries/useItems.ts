import { useQuery } from "react-query";
import { apiCall } from "../../../utils/api";

const getItems = async () => {
  const { data } = await apiCall("get", `api/item/get_all`);
  return data;
};

export const useItems = (filters: ItemFilters) => {
  const appliedFilters = Object.fromEntries(
    Object.entries(filters).filter(([key, val]) => val.length !== 0)
  );

  const handleFilters = (data: any[]) => {
    return Object.entries(filters).reduce((output, [key, value]) => {
      return output.filter((i) => {
        const filterKey = key === "submittedBy" ? i[key].userName : i[key];
        return Array.isArray(filterKey)
          ? filterKey.some((r) => value.includes(r)) ||
              //@todo remove after validation added on FE to force tags
              (key === "tags" && filterKey.length === 0) 
          : value.indexOf(filterKey as never) !== -1;
      });
    }, data);
  };

  return useQuery(["items"], getItems, {
    onSuccess: (data) => console.log(data),
    select: (data) =>
      !Object.keys(appliedFilters).length ? data : handleFilters(data),
  });
};
