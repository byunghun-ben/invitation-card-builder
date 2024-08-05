"use client";
import { ReactNode } from "react";
import { useModalContext } from "./ModalContext";

const ModalTrigger = ({ children }: { children: ReactNode }) => {
  const { openModal } = useModalContext();

  return (
    <button onClick={openModal} className="flex">
      {children}
    </button>
  );
};

export default ModalTrigger;
