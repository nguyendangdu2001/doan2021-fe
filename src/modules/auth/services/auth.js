// import AUTH_API from "@config/axios/auth";
import axios from "axios";
export const login = (requestData) => {
  console.log(requestData);
  return axios.post("/auth/login", requestData);
};
export const logout = (requestData) => {
  console.log(requestData);
  return axios.post("/auth/logout", requestData);
};
export const googleLogin = (requestData) => {
  console.log(requestData);
  return axios.post("/auth/google-login", requestData);
};
export const register = (requestData) => {
  return axios.post("/auth/register", requestData);
};
export const reset_password = (requestData) => {
  return axios.post("/auth/reset-password", requestData);
};
export const getProfile = () => {
  return axios.get("/users/profile");
};
