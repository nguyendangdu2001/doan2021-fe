import React from "react";
import SearchUserItem from "./components/SearchUserItem";
import useModal from "@hooks/useModal";
import useStrangers from "@modules/friend/hooks/useStrangers";
const NewConversationSection = () => {
  const { data: strangers } = useStrangers();
  console.log(strangers);
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="w-full px-3 py-2 font-medium transition-colors border border-gray-300 bg-gray-50 rounded-xl dark:bg-gray-800 dark:text-gray-50"
      />
      <div className="space-y-2">
        {strangers?.map((user) => {
          return <SearchUserItem {...user} />;
        })}
      </div>
    </div>
  );
};

export default NewConversationSection;
