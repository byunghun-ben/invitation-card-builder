"use client";

import { WeddingType } from "@/schemas/invitation";
import { InvitationType } from "@/types/invitation";
import { createContext, ReactNode, useContext } from "react";

const InvitationContext = createContext<{
  invitation: InvitationType;
} | null>(null);

export const InvitationContextProvider = ({
  invitation,
  children,
}: {
  invitation: InvitationType;
  children: ReactNode;
}) => {
  return (
    <InvitationContext.Provider value={{ invitation }}>
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
