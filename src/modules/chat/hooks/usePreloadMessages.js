import socket from "@config/socketio";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import { useCallback, useEffect } from "react";
import { useQueryClient } from "react-query";
import { finishPreload, startPreload } from "../slices";

const usePreloadMessages = () => {
  const loading = useAppSelector((state) => state.chat.loading);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  useEffect(() => {
    const handler = (data) => {
      queryClient.setQueryData([data?.roomId], data?.messages);
      dispatch(finishPreload({ roomId: data?.roomId }));
    };
    const newMessageHandler = (data) => {
      const { message } = data;
      const preload = queryClient.getQueryData([data?._id]);
      if (!preload) return;

      queryClient.setQueryData([data?._id], [...preload, data?.lastMessage]);
    };
    socket.on("initialMessage", handler);
    socket.on("newChatRoomMessage", newMessageHandler);
    return () => {
      socket.off("initialMessage", handler);
      socket.off("newChatRoomMessage", newMessageHandler);
    };
  }, [dispatch, queryClient]);
  const preLoadMessages = useCallback(
    (roomId) => {
      if (loading?.[roomId]) return;
      if (queryClient.getQueryData([roomId])) return;
      dispatch(startPreload({ roomId }));
      socket.emit("getInitialMessage", { roomId });
    },
    [dispatch, loading, queryClient]
  );
  return { preLoadMessages };
};

export default usePreloadMessages;
