import IconButton from "@components/IconButton";
import ModalSection from "@components/ModalSection";
import { PlusIcon } from "@heroicons/react/outline";
import React from "react";
import NewConversationSection from "../../NewConversationSection";

const NoChatRoomSection = () => {
  return (
    <div className="flex flex-col items-center py-6 space-y-6">
      <div className="text-xl font-medium">You have no conversation</div>
      <ModalSection
        button={({ open }) => (
          <IconButton
            onClick={open}
            icon={<PlusIcon className="w-5 h-5" />}
            className="text-blue-500 bg-gray-100"
          >
            New Conversation
          </IconButton>
        )}
        section={<NewConversationSection />}
        showFooter={true}
      />
    </div>
  );
};

export default NoChatRoomSection;
