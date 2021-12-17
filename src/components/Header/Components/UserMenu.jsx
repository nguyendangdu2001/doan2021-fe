import { useAppDispatch } from "@hooks/reduxHook";
import useLogout from "@modules/auth/hooks/useLogout";
import React from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout } = useLogout();
  return (
    <div className="px-1 py-1 ">
      {/* <Link
        to={`/user-page/${user?.id}`}
        className="flex items-center p-2 space-x-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-500"
      >
        <img
          src={user?.avatar}
          alt=""
          className="object-cover w-16 h-16 rounded-full"
        />
        <div className="">
          <div className="text-base font-bold dark:text-gray-50">
            {user?.lastName}
          </div>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-200">
            Go to your user page
          </div>
        </div>
      </Link> */}
      {/* <button
        className={` group flex rounded-md items-center w-full px-2 py-2 justify-between font-bold text-base h-14`}
      >
        <span>Darkmode</span>
        <DarkModeToggle
          onChange={(isDarkMode) => {
            console.log(isDarkMode);
            dispatch({
              type: "CHANGE_DARKMODE",
              payload: isDarkMode,
            });
          }}
          checked={darkMode}
          size={80}
        />
      </button> */}
      {/* <Link
        to="/user-event"
        className="flex items-center p-2 text-base font-bold h-14"
      >
        My Event
      </Link> */}
      <button
        onClick={() => {
          logout();
        }}
        to="/user-event"
        className="flex items-center p-2 text-base font-bold h-14"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
