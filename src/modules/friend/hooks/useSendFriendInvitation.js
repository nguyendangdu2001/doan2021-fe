import React from "react";
import { useMutation } from "react-query";
import { sendFriendInvitation } from "../services";

const useSendFriendInvitation = () => {
  return useMutation(async (requestData) => {
    const { data } = await sendFriendInvitation(requestData);
    return data;
  });
};

export default useSendFriendInvitation;
