"use client";

import { Dialog } from "@headlessui/react";
import { createContext, ReactNode, useContext, useState } from "react";

const ModalContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
});

const Trigger = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      <button
        type="button"
        className="flex py-2 px-3 text-xs font-bold bg-slate-100 rounded-md hover:bg-slate-200"
        onClick={() => setIsOpen(true)}
      >
        수정
      </button>

      {isOpen && children}
    </ModalContext.Provider>
  );
};

const Modal = ({ children }: { children: ReactNode }) => {
  const { isOpen, close } = useContext(ModalContext);

  return (
    <Dialog open={true} onClose={close} as="div" className="fixed inset-0 z-50">
      <Dialog.Backdrop className="fixed z-10 inset-0 bg-black/50" />
      <div className="fixed inset-0 px-6">
        <Dialog.Panel className="relative flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90%] w-full max-w-[640px] bg-white rounded shadow-md z-50 overflow-hidden">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
