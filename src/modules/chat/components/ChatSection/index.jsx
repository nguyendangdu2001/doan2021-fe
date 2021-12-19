import CustomModal from "@components/CustomModal";
import IconButton from "@components/IconButton";
import { PaperAirplaneIcon, XIcon, PhoneIcon } from "@heroicons/react/outline";
import { useAppSelector } from "@hooks/reduxHook";
import useCallVideo from "@modules/chat/hooks/useCallVideo";
import useChatMessages from "@modules/chat/hooks/useChatMessages";
import useGetInfoRoom from "@modules/chat/hooks/useGetInfoRoom";
import React, { useMemo, useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ChatMessageList from "../ChatMessageList";

const ChatSection = ({ selectedId, setSelectedId }) => {
  const chatView = useRef(null);
  const forceScroll = useCallback(() => {
    chatView.current?.forceScrollDown();
  }, []);
  const scroll = useCallback(() => {
    chatView.current?.scrollDownIfCan();
  }, []);
  const { data: messages, createMessage } = useChatMessages({
    roomId: selectedId,
    forceScroll,
    scroll,
  });
  const [reply, setReply] = useState();
  const onReply = (messageId) => {
    setReply(messageId);
  };
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
  const { data: roomInfo } = useGetInfoRoom(selectedId);
  const idTo = useMemo(() => {
    return roomInfo?.users?.find((e) => e?._id !== userId)?._id;
  }, [roomInfo, userId]);
  console.log(roomInfo);
  console.log(idTo);
  const { sendRequest, statusRing, data } = useCallVideo({
    roomId: selectedId,
    fromId: userId,
    toId: idTo,
  });

  // const onHanldeAccept = () => {
  //   window.open(
  //     `http://localhost:3000/video-call/${data?.roomId}?from=${data?.from}&to=${userId}`
  //   );
  // };

  return (
    <div className="flex flex-col flex-grow overflow-y-hidden">
      {/* <CustomModal
        isOpen={statusRing}
        title={"Nghe máy đi"}
        close={() => {}}
        showFooter
      >
        <button onClick={onHanldeAccept}>Chấp nhận</button>
        <button>Từ chối</button>
      </CustomModal> */}
      <div className="flex items-center w-full px-2">
        <div className="flex items-center flex-grow space-x-1">
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          <div>
            <div>Name</div>
          </div>
        </div>
        <div className="flex space-x-1">
          <IconButton
            onClick={sendRequest}
            icon={<PhoneIcon className="w-5 h-5" />}
          />
        </div>
      </div>
      <ChatMessageList
        {...{ selectedId, setSelectedId, messages, setReply }}
        ref={chatView}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-shrink-0 p-2 space-y-2"
      >
        {reply && (
          <div className="flex w-full">
            <div className="flex-grow">
              <div className="text-sm font-medium">
                Replying <span className="font-semibold">Nhung</span>
              </div>
              <div className="text-xs">Content</div>
            </div>
            <IconButton
              icon={<XIcon className="w-4 h-4" />}
              onClick={() => setReply()}
              className="flex-shrink-0 h-7 p-0.5 bg-gray-200 aspect-1"
            />
          </div>
        )}
        <div className="flex flex-shrink-0 space-x-2">
          <input
            {...register("content", { required: true })}
            type="text"
            className="flex-grow px-3 py-2 font-medium transition-colors border border-gray-300 bg-gray-50 rounded-xl dark:bg-gray-800 dark:text-gray-50"
          />
          <IconButton
            icon={<PaperAirplaneIcon className="w-5 h-5 rotate-90" />}
          />
        </div>
      </form>
    </div>
  );
};

export default ChatSection;
