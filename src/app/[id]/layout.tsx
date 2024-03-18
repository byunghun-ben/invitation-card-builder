import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: {
    id: string;
  };
};

const InstaViewLayout = ({ children, params }: Props) => {
  return <div className="w-full max-w-lg mx-auto">{children}</div>;
};

export default InstaViewLayout;
