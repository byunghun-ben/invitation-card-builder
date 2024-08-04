"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ClientIdContextType = {
  clientId: string;
};

const ClientIdContext = createContext<ClientIdContextType | null>(null);

export const ClientIdProvider = ({ children }: { children: ReactNode }) => {
  const [clientId, setClientId] = useState<string>("");

  useEffect(() => {
    const localClientId = localStorage.getItem("clientId");

    if (localClientId) {
      setClientId(localClientId);
      return;
    }

    const newClientId = Math.random().toString(36).slice(2);

    localStorage.setItem("clientId", newClientId);

    setClientId(newClientId);
  }, []);

  return (
    <ClientIdContext.Provider value={{ clientId }}>
      {children}
    </ClientIdContext.Provider>
  );
};

export const useClientIdContext = () => {
  const context = useContext(ClientIdContext);

  if (!context) {
    throw new Error(
      "useClientIdContext must be used within a ClientIdProvider",
    );
  }

  return context;
};
