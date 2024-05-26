import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col min-h-full">{children}</div>;
};

export default Layout;
