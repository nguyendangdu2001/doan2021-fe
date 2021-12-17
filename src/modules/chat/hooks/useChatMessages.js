import socket from "@config/socketio";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

const useChatMessages = ({ roomId, forceScroll, scroll }) => {
  console.log(forceScroll, scroll);
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState(
    queryClient.getQueryData([roomId]) || []
  );

  useEffect(() => {
    const newMessageHandler = (data) => {
      setMessages((prev) => [...prev, data]);
      scroll?.();
    };
    socket.on("newMessage", newMessageHandler);
    socket.emit("joinChatRoom", { roomId });
    const preloadMess = queryClient.getQueryData([roomId]);
    if (preloadMess) {
      setMessages(preloadMess);
      forceScroll?.();
      queryClient.removeQueries([roomId]);
    } else {
      socket.emit("getInitialMessage", { roomId }, (data) => {
        setMessages((prev) => [...prev, ...data]);
        forceScroll?.();
      });
    }

    return () => {
      socket.off("newMessage", newMessageHandler);
      socket.emit("leaveChatRoom", { roomId });
    };
  }, [forceScroll, queryClient, roomId, scroll]);
  const createMessage = (messages) => {
    const id = Date.now().toString();
    setMessages((prev) => [...prev, { ...messages, _id: id, loading: true }]);
    forceScroll?.();
    socket.emit("sendMessage", messages, (data) => {
      setMessages((prev) => [...prev].map((v) => (v?._id === id ? data : v)));
    });
  };
  useEffect(() => {
    console.log(messages);
    return () => {};
  }, [messages]);
  return { data: messages, createMessage };
};

export default useChatMessages;
