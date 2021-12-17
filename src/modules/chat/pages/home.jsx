import IconButton from "@components/IconButton";
import {
  PaperAirplaneIcon,
  PlusIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import ChatRoomListItem from "../components/ChatRoomListItem";
import { Scrollbars } from "react-custom-scrollbars";
import ChatMessageList from "../components/ChatMessageList";
import ChatRoomSection from "../components/ChatRoomSection";
import ChatSection from "../components/ChatSection";
import socket from "@config/socketio";
import { useQueryClient } from "react-query";
const Home = () => {
  const [selectedId, setSelectedId] = useState();

  return (
    <div className="flex w-full h-full divide-x divide-gray-300">
      <div className="flex flex-col w-1/4 h-full p-3">
        <ChatRoomSection {...{ selectedId, setSelectedId }} />
      </div>
      <div className="flex flex-col w-1/2 h-full overflow-y-hidden">
        {selectedId && <ChatSection {...{ selectedId, setSelectedId }} />}
      </div>
      <div className="flex flex-col w-1/4 h-full overflow-y-hidden">
        <div
          className="flex flex-col flex-grow max-h-full overflow-y-hidden"
          style={{ flexBasis: 0 }}
        >
          <div className="overflow-x-hidden">
            <div>
              <div className="py-3 space-y-3 text-center">
                <div className="grid place-content-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                </div>
                <div className="">
                  <div className="font-semibold">Nhung Nguyễn</div>
                  <div className="text-sm text-gray-600">Đang hoạt động</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
