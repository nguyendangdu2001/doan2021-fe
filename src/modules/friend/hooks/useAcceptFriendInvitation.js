import React from "react";
import { useMutation } from "react-query";
import { acceptFriendInvitation, sendFriendInvitation } from "../services";

const useAcceptFriendInvitation = () => {
  return useMutation(
    async (requestData) => {
      const { data } = await acceptFriendInvitation(requestData);
      return data;
    },
    { retry: 0 }
  );
};

export default useAcceptFriendInvitation;
