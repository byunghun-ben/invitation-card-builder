import { redirect } from "next/navigation";

const NoPage = async () => {
  redirect("/auth/login");
};

export default NoPage;
