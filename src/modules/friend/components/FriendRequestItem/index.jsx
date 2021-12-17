import React from "react";
import useAcceptFriendInvitation from "@modules/friend/hooks/useAcceptFriendInvitation";
const FriendRequestItem = ({ user, createdAt, _id }) => {
  const { mutate: accept } = useAcceptFriendInvitation();
  return (
    <div className="p-2 space-y-2 transition-colors rounded-lg hover:bg-gray-50">
      <div className="flex space-x-2">
        <div className="overflow-hidden bg-gray-200 rounded-full w-14 h-14">
          <img
            src={user?.avatar}
            alt=""
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="space-y-1">
          <div className="">
            <span className="font-semibold">{user?.lastName}</span> want to be
            yourfriend
          </div>
          <div className="text-sm font-medium text-blue-500">2 days ago</div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          className="px-3 py-2 text-base font-semibold bg-blue-500 rounded-md shadow text-gray-50"
          onClick={() => accept({ invitationId: _id })}
        >
          Accept
        </button>
        <button className="px-3 py-2 text-base font-semibold text-gray-600 bg-gray-100 rounded-md shadow">
          Decline
        </button>
      </div>
    </div>
  );
};

export default FriendRequestItem;
