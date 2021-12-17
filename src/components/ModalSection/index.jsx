import useModal from "@hooks/useModal";
import React from "react";
import CustomModal from "@components/CustomModal";
const ModalSection = ({ button, section, title, showFooter }) => {
  const { close, isOpen, open } = useModal();
  return (
    <>
      {button?.({ open }) || (
        <button className="flex items-center opacity-70" onClick={open}>
          Edit
        </button>
      )}
      {/* <div className="flex items-baseline space-x-1"></div> */}
      <CustomModal
        title={title}
        close={close}
        isOpen={isOpen}
        showFooter={showFooter}
      >
        {React.isValidElement(section) ? section : section?.({ close })}
      </CustomModal>
    </>
  );
};

export default ModalSection;
