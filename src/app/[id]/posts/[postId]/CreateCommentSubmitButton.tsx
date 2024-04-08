import { Loading } from "@/components/Loading";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="border py-2 rounded hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
    >
      {pending ? (
        <Loading />
      ) : (
        <span className="text-sm font-bold">작성하기</span>
      )}
    </button>
  );
};

export default SubmitButton;
