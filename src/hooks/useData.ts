import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useData = () => {
  const appointments = useQuery({
    queryKey: ["appointments"],
    queryFn: () =>
      axios.get("http://localhost:3001/appointments").then((res) => res.data),
  });

  return { appointments };
};
