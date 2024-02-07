"use client";

import Header from "@/components/Header";
import SignupForm from "./SignupForm";
import EditForm from "./EditForm";
import { useState } from "react";

const Page = () => {
  const [isCreate, setIsCreate] = useState(true);

  return (
    <div className="flex flex-col">
      <Header />
      <section className="w-full max-w-sm mx-auto py-20">
        {isCreate && <SignupForm setIsCreate={setIsCreate} />}

        {!isCreate && <EditForm setIsCreate={setIsCreate} />}
      </section>
    </div>
  );
};

export default Page;
