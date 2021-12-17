import IconButton from "@components/IconButton";
import PopupSection from "@components/PopupSection";
import { UserAddIcon } from "@heroicons/react/outline";
import FriendRequestSection from "@modules/friend/components/FriendRequestSection";
import React from "react";

const FriendInvitationsPopup = () => {
  return (
    <PopupSection button={<IconButton icon={<UserAddIcon className="w-6 h-6" />} />} section={<FriendRequestSection />} />
  );
};

export default FriendInvitationsPopup;
