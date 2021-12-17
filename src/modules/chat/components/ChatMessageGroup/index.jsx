import IconButton from "@components/IconButton";
import { ReplyIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React from "react";
import ChatMessageItem from "../ChatMessageItem";

const ChatMessageGroup = ({ isSented, messages, user }) => {
  return (
    <div>
      <div className="space-y-1">
        {messages?.map((message, index) => (
          <div
            className={classNames(
              "flex items-end w-full space-x-2 group",
              isSented ? "flex-row-reverse space-x-reverse" : ""
            )}
          >
            {!isSented && (
              <div className="w-8">
                {index === messages?.length - 1 && (
                  <div className="w-8 h-8 overflow-hidden bg-gray-400 rounded-lg">
                    <img
                      src={user?.avatar}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
            )}

            <ChatMessageItem
              isSented={isSented}
              {...message}
              key={message?._id}
            />
            <div className="items-center self-center hidden space-x-1 group-hover:flex">
              <IconButton
                icon={<ReplyIcon className="w-4 h-4" />}
                className="p-1 text-gray-500 hover:bg-gray-200"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessageGroup;
