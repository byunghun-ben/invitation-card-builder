"use client";

import { createContext, ReactNode, useContext } from "react";
import { Invitation } from "../types";
import { WeddingType } from "@/schemas/invitation";

const InvitationContext = createContext<{
  invitation: Invitation;
  wedding: WeddingType;
} | null>(null);

export const InvitationContextProvider = ({
  invitation,
  wedding,
  children,
}: {
  invitation: Invitation;
  wedding: WeddingType;
  children: ReactNode;
}) => {
  return (
    <InvitationContext.Provider value={{ invitation, wedding }}>
      {children}
    </InvitationContext.Provider>
  );
};

export const useInvitationContext = () => {
  const context = useContext(InvitationContext);

  if (!context) {
    throw new Error(
      "useInvitationContext must be used within a InvitationContextProvider",
    );
  }

  return context;
};
