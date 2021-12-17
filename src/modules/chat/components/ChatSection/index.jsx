import IconButton from "@components/IconButton";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { useAppSelector } from "@hooks/reduxHook";
import useChatMessages from "@modules/chat/hooks/useChatMessages";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import ChatMessageList from "../ChatMessageList";

const ChatSection = ({ selectedId, setSelectedId }) => {
  const chatView = useRef(null);
  const { data: messages, createMessage } = useChatMessages({
    roomId: selectedId,
    forceScroll: chatView.current?.forceScrollDown,
    scroll: chatView.current?.scrollDownIfCan,
  });

  const userId = useAppSelector((state) => state.auth?.user?._id);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const message = {
      ...data,
      createAt: Date.now(),
      from: userId,
      to: selectedId,
    };
    createMessage(message);
    reset();
  };
  return (
    <div className="flex flex-col flex-grow overflow-y-hidden">
      <ChatMessageList
        {...{ selectedId, setSelectedId, messages }}
        ref={chatView}
      />
      <form
        className="flex flex-shrink-0 p-2 space-x-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("content", { required: true })}
          type="text"
          className="flex-grow px-3 py-2 font-medium transition-colors border border-gray-300 bg-gray-50 rounded-xl dark:bg-gray-800 dark:text-gray-50"
        />
        <IconButton
          icon={<PaperAirplaneIcon className="w-5 h-5 rotate-90" />}
        />
      </form>
    </div>
  );
};

export default ChatSection;
