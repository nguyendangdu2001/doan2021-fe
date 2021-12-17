import axios from "axios";

export const findStrangers = () => {
  return axios.get("/friends/action/find-strangers");
};

export const sendFriendInvitation = (requestData) => {
  return axios.post("/friend-invitations", requestData);
};

export const getAllFriendRequest = () => {
  return axios.get("/friend-invitations");
};
export const acceptFriendInvitation = (requestData) => {
  return axios.post(
    `/friend-invitations/action/accept/${requestData?.invitationId}`
  );
};
