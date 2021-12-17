import { useAppSelector } from "@hooks/reduxHook";
import classNames from "classnames";
import moment from "moment";
import React from "react";

const ChatRoomListItem = ({
  lastMessage,
  _id,
  users,
  type,
  selected,
  onClick,
  onMouseEnter,
}) => {
  console.log(lastMessage);
  const userId = useAppSelector((state) => state.auth.user?._id);
  const otherUser = users?.find((v) => v?._id !== userId);
  const name = otherUser?.lastName;
  const ava = otherUser?.avatar;
  return (
    <button
      onClick={onClick}
      onMouseEnter={selected === _id ? onMouseEnter : undefined}
      className={classNames(
        "flex items-center justify-between p-4 space-x-2 hover:bg-gray-100 text-base w-full text-left",
        selected && "bg-gray-100"
      )}
    >
      <div className="flex-shrink-0 bg-gray-200 rounded-lg w-14 h-14">
        <img
          src={ava}
          alt=""
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="flex flex-col items-stretch flex-grow flex-shrink min-w-0">
        <div className="w-full">
          <div className="font-medium text-indigo-700">{name}</div>
          {lastMessage && (
            <div className="flex items-center w-full space-x-1 text-sm text-gray-500 break-words">
              <span className="flex-shrink overflow-x-hidden line-clamp-1">
                {lastMessage?.from === userId
                  ? "Bạn"
                  : lastMessage?.fromUser?.[0]?.lastName}
                :{lastMessage?.content}
              </span>
              <span>·</span>
              <span className="flex-shrink-0 whitespace-nowrap">
                {moment(lastMessage?.createdAt).fromNow()}
              </span>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </button>
  );
};

export default ChatRoomListItem;
