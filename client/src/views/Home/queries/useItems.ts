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
        console.log(i.title)
        console.log(i[key].userName)
        console.log(Array.isArray(filterKey) && filterKey.some((s:any) => value.includes(s)))
        console.log(filterKey)
        return Array.isArray(filterKey)
          ? filterKey.some((r) => value.includes(r))
          : value.indexOf(filterKey as never) !== -1;
      });
    }, data);
  };

  return useQuery(["items"], getItems, {
    onSuccess: (data) => console.log(data),
    select: (data) =>
      !Object.keys(appliedFilters).length ? data : handleFilters(data),
      // !Object.keys(appliedFilters).length ? data : data,
  });
};
