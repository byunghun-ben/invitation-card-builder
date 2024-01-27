import Header from "@/components/Header";
import Link from "next/link";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";

const Page = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <section className="container mx-auto py-20">
        <div className="flex justify-center divide-x">
          <CreateForm />

          <EditForm />
        </div>
      </section>
    </div>
  );
};

export default Page;
