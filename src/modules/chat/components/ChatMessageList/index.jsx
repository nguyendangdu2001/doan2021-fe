import { useAppSelector } from "@hooks/reduxHook";
import moment from "moment";
import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";
import ChatMessageGroup from "../ChatMessageGroup";
import ChatMessageItem from "../ChatMessageItem";

const ChatMessageList = ({ messages }, ref) => {
  const userId = useAppSelector((state) => state.auth.user?._id);
  const groupedMessage = useMemo(() => {
    if (messages?.length === 0) return [];
    const firstMessage = messages[0];
    const messageGroup = [[firstMessage]];
    const newMessages = messages.slice(1).reduce(
      (messages, currentMess) => {
        let lastMessages = messages[messages.length - 1];
        let lastMsg = lastMessages[lastMessages.length - 1];
        if (lastMsg.from === currentMess.from) {
          lastMessages.push(currentMess);
          messages[messages.length - 1] = lastMessages;
        } else {
          messages.push([currentMess]);
        }
        return messages;
      },
      [[firstMessage]]
    );
    const groups = newMessages.map((mGroup) => {
      const message = mGroup[mGroup.length - 1];
      return {
        user: message?.fromUser?.[0],
        userId: message?.from,
        message: mGroup,
        _id: message?._id,
        date: message?.createdAt,
      };
    }, []);
    console.log(groups, newMessages);
    return groups;
  }, [messages]);
  const chatView = useRef(null);
  useEffect(() => {
    if (chatView.current) {
      console.log(chatView);
      chatView.current.scrollTo(0, chatView.current.scrollHeight);
    }

    return () => {};
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      forceScrollDown: () => {
        if (chatView.current)
          chatView.current.scrollTop = chatView.current.scrollHeight;
      },
      scrollDownIfCan: () => {
        if (chatView.current) {
          console.log(chatView);
          console.log(
            chatView.current.scrollHeight -
              chatView.current.scrollTop -
              chatView.current.clientHeight
          );
          if (
            chatView.current.scrollHeight -
              chatView.current.scrollTop +
              chatView.current.clientHeight <
            50
          )
            chatView.current.scrollTop = chatView.current.scrollHeight;
        }
      },
    }),
    []
  );
  return (
    <div className="relative flex flex-col flex-grow flex-shrink w-full px-1 overflow-y-hidden">
      <div
        className="flex flex-col items-end justify-end flex-grow w-full max-h-full overflow-y-hidden"
        style={{ flexBasis: 0 }}
      >
        <div
          className="w-full overflow-x-hidden"
          ref={chatView}
          style={{ overscrollBehavior: "contain" }}
        >
          <div className="space-y-2">
            {groupedMessage?.map((group) => (
              <ChatMessageGroup
                key={group?._id}
                user={group?.user}
                messages={group?.message}
                isSented={group?.userId === userId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ChatMessageList);
