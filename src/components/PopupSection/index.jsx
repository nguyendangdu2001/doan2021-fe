import { Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";

const PopupSection = ({
  button,
  section,
  popoverContainerClassName,
  buttonContainerClassName,
  sectionContainerClassName,
}) => {
  return (
    <Popover
      as="div"
      className={classNames(
        "relative inline-block text-left",
        popoverContainerClassName
      )}
    >
      <Popover.Button className={buttonContainerClassName}>
        {button}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel
          className={classNames(
            "absolute right-0 p-3 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-600 dark:text-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none",
            sectionContainerClassName
          )}
        >
          {section}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default PopupSection;
