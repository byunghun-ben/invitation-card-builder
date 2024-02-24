import Header from "@/components/Header";
import SignupForm from "./SignupForm";

const Page = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <section className="w-full max-w-sm mx-auto py-20">
        <SignupForm />
      </section>
    </div>
  );
};

export default Page;
