import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const CustomModal = ({ isOpen, close, children, title, showFooter }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={close}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 space-y-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              {title && (
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
              )}
              {children}
              {showFooter && (
                <div className="flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    className="p-2 text-base font-medium text-gray-500 transition-colors rounded-md hover:text-gray-900 hover:bg-gray-100"
                    onClick={close}
                  >
                    Close
                  </button>
                  {showFooter?.extra}
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomModal;
