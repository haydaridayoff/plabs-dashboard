import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const DialogFormContextProvider: React.FC<Props> = (props) => {
  const [inputElement, setInputElement] = useState<React.ReactNode>(<></>);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeDialog = () => {
    setInputElement(<></>);
    setIsOpen(false);
  };

  const openDialog = (node: React.ReactNode) => {
    setInputElement(node);
    setIsOpen(true);
  };

  return (
    <DialogFormContext.Provider
      value={{
        openDialog: openDialog,
        closeDialog: closeDialog,
      }}
    >
      {props.children}
      <div
        className={`${
          !isOpen ? "hidden" : ""
        } fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-10`}
      >
        <dialog
          open={isOpen}
          className={`fixed top-1/2 left-1/2 m-0 translate-x-[-50%] translate-y-[-50%] p-6 w-[37.5rem]  rounded-xl font-jakarta`}
        >
          {inputElement}
        </dialog>
      </div>
    </DialogFormContext.Provider>
  );
};

const DialogFormContext = createContext({
  openDialog: (node: React.ReactNode) => {},
  closeDialog: () => {},
});

export default DialogFormContext;
