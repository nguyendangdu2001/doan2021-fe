import { useAppDispatch } from "@hooks/reduxHook";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { login as loginAction } from "../slices";
import { googleLogin } from "../services/auth";
import socket from "@config/socketio";

const useGoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return useMutation(
    async (requestData) => {
      const { data } = await googleLogin(requestData);
      return await new Promise((resolve) => {
        console.log("auth ws");
        socket.emit("login", { token: data?.user?.token }, (error) => {
          resolve(data);
        });
      });
    },
    {
      onSuccess: (data) => {
        console.log(data);
        dispatch(loginAction(data));
        navigate("/");
      },
    }
  );
};

export default useGoogleLogin;
