import axios from "axios";
const fetchInfoRoom = (id) => {
  return axios.get(`chat-rooms/${id}`);
};
export { fetchInfoRoom };
