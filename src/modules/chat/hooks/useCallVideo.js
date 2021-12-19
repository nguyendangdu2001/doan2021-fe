import socket from "@config/socketio";
import React, { useEffect, useState } from "react";

const useCallVideo = ({ roomId, fromId, toId }) => {
  const [statusRing, setStatusRing] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    socket.on("requestCallVideo", (data) => {
      if (data) {
        setStatusRing(true);
        setData((old) => data);
        // window.open(`http://localhost:3000/video-call/${data?.roomId}`);
      }
    });
  }, [roomId, fromId, toId]);
  const sendRequest = () => {
    socket.emit("requestCallVideo", { roomId, from: fromId, to: toId });
    window.open(
      `http://localhost:3000/video-call/${roomId}?from=${fromId}&to=${toId}&call=true`
    );
  };
  return { sendRequest, statusRing, setStatusRing, data };
};

export default useCallVideo;
