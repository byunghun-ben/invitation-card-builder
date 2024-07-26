import { createContext, ReactNode, useContext } from "react";

const InvitationContext = createContext(null);

export const InvitationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <InvitationContext.Provider value={null}>
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
