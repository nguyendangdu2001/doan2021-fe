import React from "react";
import { BellIcon, HomeIcon, MusicNoteIcon } from "@heroicons/react/outline";
import useGetProfile from "@modules/auth/hooks/useGetProfile";
import PopupSection from "@components/PopupSection";
import UserMenu from "./Components/UserMenu";
import { useAppSelector } from "@hooks/reduxHook";
import FriendInvitationsPopup from "./Components/FriendInvitationsPopup";
const Header = () => {
  const { data } = useGetProfile();
  const auth = useAppSelector((state) => state.auth.isAuth);
  return (
    <div className="flex items-center justify-between w-full px-2 py-1 shadow">
      <div className="text-2xl font-bold">Tên App</div>
      {auth && (
        <>
          <div className="flex">
            <div className="px-8 py-2 transition-colors rounded hover:bg-gray-200">
              <HomeIcon className="w-6 h-6" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-4">
              <div className="p-3">
                <BellIcon className="w-6 h-6" />
              </div>
              <FriendInvitationsPopup />
              <PopupSection
                button={
                  <div className="w-10 h-10 overflow-hidden bg-gray-500 rounded-full">
                    <img src={data?.avatar} alt="" />
                  </div>
                }
                section={<UserMenu />}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
