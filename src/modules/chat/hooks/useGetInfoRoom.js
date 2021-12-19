import { useQuery } from "react-query";
import { fetchInfoRoom } from "../services";
const useGetInfoRoom = (id) => {
  return useQuery(["room-detail", id], async () => {
    const { data } = await fetchInfoRoom(id);
    return data;
  });
};

export default useGetInfoRoom;
