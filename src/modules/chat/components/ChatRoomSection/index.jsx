import IconButton from "@components/IconButton";
import ModalSection from "@components/ModalSection";
import socket from "@config/socketio";
import { PlusIcon, SearchIcon } from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import useChatRoom from "@modules/chat/hooks/useChatRoom";
import usePreloadMessages from "@modules/chat/hooks/usePreloadMessages";
import { finishPreload, startPreload } from "@modules/chat/slices";
import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useQueryClient } from "react-query";
import ChatRoomListItem from "../ChatRoomListItem";
import NewConversationSection from "../NewConversationSection";
import NoChatRoomSection from "./components/NoChatRoomSection";

const ChatRoomSection = ({ selectedId, setSelectedId }) => {
  const [count, setConut] = useState(0);
  const { data: chatRooms } = useChatRoom();

  const { preLoadMessages } = usePreloadMessages();
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="text-xl font-bold">Chat</div>
        <div className="flex space-x-2">
          <IconButton
            icon={<SearchIcon className="w-5 h-5" />}
            onClick={() => setConut(count + 1)}
          />
          <ModalSection
            button={({ open }) => (
              <IconButton
                icon={<PlusIcon className="w-5 h-5" />}
                onClick={open}
              />
            )}
            section={<NewConversationSection />}
            showFooter={true}
          />
        </div>
      </div>
      <div className="flex-grow min-h-0 px-1 -mx-3">
        {chatRooms?.length === 0 && <NoChatRoomSection />}
        {chatRooms?.length > 0 && (
          <Scrollbars style={{ width: "100%", height: "100%" }} autoHide>
            {chatRooms?.map((room) => (
              <ChatRoomListItem
                onMouseEnter={() => preLoadMessages(room?._id)}
                key={room?._id}
                {...room}
                selected={room?._id === selectedId}
                onClick={() => setSelectedId(room?._id)}
              />
            ))}
          </Scrollbars>
        )}
      </div>
    </>
  );
};

export default ChatRoomSection;
