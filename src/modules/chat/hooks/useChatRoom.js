import socket from "@config/socketio";
import React, { useEffect, useState } from "react";

const useChatRoom = () => {
  const [chatRoom, setChatRoom] = useState([]);
  useEffect(() => {
    socket.on("rooms", (data) => {
      setChatRoom((prev) => [...prev, ...data]);
    });
    socket.on("newChatRoom", (data) => {
      setChatRoom((prev) => [data, ...prev]);
    });
    socket.on("newChatRoomMessage", (data) => {
      setChatRoom((prev) => {
        const itemIndex = prev?.findIndex((v) => {
          return v?._id === data?._id;
        });
        if (itemIndex !== -1) {
          const newRooms = [...prev];
          newRooms.splice(itemIndex, 1);
          newRooms.unshift({ ...prev[itemIndex], ...data });
          console.log(newRooms, "new");
          return newRooms;
        } else {
          return [data, ...prev];
        }
      });
    });
    socket.emit("getInitialChatRooms", (data) => {
      setChatRoom((prev) => [...prev, ...data]);
    });
    return () => {};
  }, []);
  useEffect(() => {
    console.log(chatRoom);
    return () => {};
  }, [chatRoom]);
  return { data: chatRoom };
};

export default useChatRoom;
