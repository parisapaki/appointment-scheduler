import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useData = () => {
  const appointments = useInfiniteQuery({
    queryKey: ["appointments"],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get(`http://localhost:3001/appointments?_page=${pageParam}&_limit=3`)
        .then((res) => res.data),
    getNextPageParam(lastPage, allPages) {
      if (lastPage.length < 3) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  return { appointments };
};
