import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "@components/Footer";
import Header from "@components/Header";

import { ScrollToTop } from "@components/ScrollToTop";
import GetRoutes from "@routes/GetRoutes";
import { LazyMotion } from "framer-motion";
import React, { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";

import axios from "axios";
import { useAppSelector } from "@hooks/reduxHook";
import socket from "@config/socketio";
import useCallVideo from "@modules/chat/hooks/useCallVideo";
import CustomModal from "@components/CustomModal";
import IconButton from "@components/IconButton";

const loadFeatures = () =>
  import("./config/framer-motion").then((res) => res.default);
function App() {
  useEffect(() => {
    // setInterval(() => socket.emit("whoami"), 1000);

    return () => {};
  }, []);
  const { statusRing, sendRequest, setStatusRing, data } = useCallVideo({
    roomId: "q",
    fromId: "q",
    toId: "q",
  });
  const user = useAppSelector((s) => s?.auth?.user);
  const onHanldeAccept = () => {
    window.open(
      `http://localhost:3000/video-call/${data?.roomId}?to=${data?.from}&from=${user?._id}`
    );
  };
  const darkMode = useAppSelector((state) => state.dark.isDark);
  return (
    <div className={`${darkMode ? "dark" : ""} h-full`}>
      <CustomModal
        isOpen={statusRing}
        title={"Nghe máy đi"}
        close={() => {}}
        showFooter
      >
        <button onClick={onHanldeAccept}>Chấp nhận</button>
        <button>Từ chối</button>
      </CustomModal>

      <div className="dark:bg-[#121212] bg-gray-50 transition-colors h-full">
        <LazyMotion features={loadFeatures} strict>
          <div style={{ position: "absolute" }} id="back-to-top-anchor" />
          <div className="flex flex-col flex-auto h-full min-h-0">
            <Header />
            <GetRoutes />
            {/* <Footer /> */}
          </div>
          <ToastContainer />
          <ScrollToTop />
          <ReactQueryDevtools initialIsOpen />
        </LazyMotion>
      </div>
    </div>
  );
}

export default App;
