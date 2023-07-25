import React, { createContext, useEffect, useRef, useState } from "react";
import icons from "../../assets/icons/icons";

interface Props {
  children: React.ReactNode;
}

export const DialogFormContextProvider: React.FC<Props> = (props) => {
  const [title, setTitle] = useState<string>("");
  const [inputElement, setInputElement] = useState<React.JSX.Element>(() => (
    <></>
  ));
  const [data, setData] = useState<any>({}); // [key: string]: any
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState(false);

  const onConfirmForm = useRef<
    (event: React.FormEvent<HTMLFormElement>) => void
  >(() => {});

  const onCancelForm = useRef<() => void>(() => {});

  const closeDialog = () => {
    setTitle("");
    setInputElement(<></>);
    setData({});
    onCancelForm.current = () => {};
    onConfirmForm.current = () => {};
    setIsOpen(false);
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  const createDialog = (
    title: string,
    data: any | any[],
    inputElement: React.JSX.Element,
    onConfirm: () => void,
    onCancel: () => void,
  ) => {
    setTitle(title);
    setData(data);
    setInputElement(inputElement);
    onConfirmForm.current = onConfirm;
    onCancelForm.current = onCancel;
    setIsOpen(true);
  };

  const SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirmForm.current(event);
    closeDialog();
  };

  return (
    <DialogFormContext.Provider
      value={{
        createDialog: createDialog,
        toggleDialog: isOpen ? closeDialog : openDialog,
        isOpen: isOpen,
        data: data,
        setData: (data: any | any[]) => setData(data),
        setInputElement: (inputElement: React.JSX.Element) =>
          setInputElement(inputElement),
        refresh: () => {
          setRefresh(!refresh);
        },
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
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h3 className="font-bold text-base text-left">{title}</h3>
              <button type="button" className="w-4 h-4" onClick={closeDialog}>
                <img
                  src={icons.cancelEdit.orange}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </button>
            </div>
            <form onSubmit={SubmitHandler}>
              {inputElement}
              <div className="flex gap-4 w-full justify-evenly">
                <button
                  onClick={() => {
                    onCancelForm.current();
                    closeDialog();
                  }}
                  className="w-full border border-[#666666] rounded-md px-4 py-2 shadow-sm text-[#666666]"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="w-full border border-transparent bg-[#0AB663] rounded-md px-4 py-2 shadow-sm text-white"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </DialogFormContext.Provider>
  );
};

const DialogFormContext = createContext({
  createDialog: (
    title: string,
    data: any | any[],
    inputElement: React.JSX.Element,
    onConfirm: () => void,
    onCancel: () => void,
  ) => {},
  toggleDialog: () => {},
  setInputElement: (inputElement: React.JSX.Element) => {},
  isOpen: false,
  data: {}, //data default type is any
  setData: (data: any) => {},
  refresh: () => {},
});

export default DialogFormContext;
