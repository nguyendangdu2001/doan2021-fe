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

const loadFeatures = () =>
  import("./config/framer-motion").then((res) => res.default);
function App() {
  useEffect(() => {
    // setInterval(() => socket.emit("whoami"), 1000);

    return () => {};
  }, []);

  const darkMode = useAppSelector((state) => state.dark.isDark);
  return (
    <div className={`${darkMode ? "dark" : ""} h-full`}>
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
