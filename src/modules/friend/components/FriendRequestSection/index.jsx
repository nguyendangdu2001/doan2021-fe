import useFriendInvitations from "@modules/friend/hooks/useFriendInvitations";
import React from "react";
import FriendRequestItem from "../FriendRequestItem";

const FriendRequestSection = () => {
  const { data: friendInvitations } = useFriendInvitations();
  return (
    <div className="w-96">
      <div className="text-lg font-semibold">Friend Request</div>
      <div className="space-y-2">
        {friendInvitations?.map((invitation) => (
          <FriendRequestItem user={invitation?.from} {...invitation} />
        ))}
      </div>
    </div>
  );
};

export default FriendRequestSection;
