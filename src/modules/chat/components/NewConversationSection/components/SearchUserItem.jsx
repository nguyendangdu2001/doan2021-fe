import useSendFriendInvitation from "@modules/friend/hooks/useSendFriendInvitation";
import classNames from "classnames";
import React, { useState } from "react";

const SearchUserItem = ({ lastName, _id, avatar }) => {
  const [isSentedRequest, setIsSentedRequest] = useState(false);
  const { mutate: sendRequest } = useSendFriendInvitation();
  const onSendRequestSuccess = () => {
    setIsSentedRequest(true);
  };
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center flex-grow space-x-2">
        <div className="overflow-hidden bg-gray-400 rounded-full w-14 h-14">
          <img src={avatar} alt="" />
        </div>
        <div className="flex-grow font-medium">
          <div>{lastName}</div>
        </div>
      </div>
      <button
        onClick={() =>
          sendRequest({ to: _id }, { onSuccess: onSendRequestSuccess })
        }
        className={classNames(
          "flex-shrink-0 px-3 py-1 text-base font-medium rounded-md",
          isSentedRequest
            ? "bg-green-500 text-gray-50"
            : " border border-blue-500"
        )}
      >
        {!isSentedRequest ? "Add" : "Sented"}
      </button>
    </div>
  );
};

export default SearchUserItem;
