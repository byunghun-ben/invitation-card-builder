"use client";

import Header from "@/components/Header";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { useState } from "react";

const Page = () => {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="flex flex-col">
      <Header />
      <section className="w-full max-w-sm mx-auto py-20">
        {isSignup && <SignupForm setIsSignup={setIsSignup} />}

        {!isSignup && <LoginForm setIsSignup={setIsSignup} />}
      </section>
    </div>
  );
};

export default Page;
