import IconButton from "@components/IconButton";
import { ReplyIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useEffect } from "react";

const ChatMessageItem = ({ content, isSented, isNew }) => {
  // useEffect(() => {
  //   if (isNew) {
  //   }
  //   return () => {};
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div
      className={classNames(
        "max-w-[540px] break-words rounded-xl py-2 px-3 font-medium",
        isSented
          ? "group-first-of-type:rounded-tr-xl rounded-r group-last-of-type:rounded-br-xl"
          : "group-first-of-type:rounded-tl-xl rounded-l group-last-of-type:rounded-bl-xl",
        isSented ? "bg-blue-500 text-gray-50" : " bg-gray-200"
      )}
    >
      {content}
    </div>
  );
};

export default ChatMessageItem;
