"use client";

import { useEventForm } from "../hooks/EventFormContext";

const SubmitButton = () => {
  const { eventForm } = useEventForm();

  const handleSubmit = () => {
    console.log("청첩장 만들기", eventForm);
  };

  return (
    <div className="sticky bottom-0 flex items-center justify-end p-4 lg:p-8">
      <button
        className="flex-center py-2 px-4 rounded bg-blue-600"
        type="button"
        onClick={handleSubmit}
      >
        <span className="flex text-white">청첩장 만들기</span>
      </button>
    </div>
  );
};

export default SubmitButton;
