import Header from "@/components/Header";
import LoginForm from "./LoginForm";

const Page = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <section className="w-full max-w-sm mx-auto py-20">
        <LoginForm />
      </section>
    </div>
  );
};

export default Page;
