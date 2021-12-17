import React from "react";
import { useQuery } from "react-query";
import { getAllFriendRequest } from "../services";

const useFriendInvitations = () => {
  return useQuery(["friend-invitations"], async () => {
    const { data } = await getAllFriendRequest();
    return data;
  });
};

export default useFriendInvitations;
