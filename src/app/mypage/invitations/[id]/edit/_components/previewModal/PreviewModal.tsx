"use client";

import { InvitationType } from "@/types/invitation";
import Link from "next/link";
import InstaPostItem from "./InstaPostItem";
import InstaMapItem from "./InstaMapItem";
import InstaCoverItem from "./InstaCoverItem";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "lucide-react";
import InstaGreetingItem from "./InstaGreetingItem";

type Props = {
  invitation: InvitationType;
};

const PreviewModal = ({ invitation }: Props) => {
  const invitationId = invitation.id;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="flex text-sm font-bold text-slate-700"
        onClick={() => setIsOpen(true)}
      >
        미리보기
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        as="div"
        className="fixed inset-0 z-50"
      >
        <Dialog.Backdrop className="fixed z-10 inset-0 bg-black opacity-50" />
        <div className="fixed inset-0 px-6">
          <Dialog.Panel className="relative flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90%] w-full max-w-[640px] bg-white rounded shadow-md z-50 overflow-hidden">
            <div className="flex-1 max-w-lg flex flex-col overflow-y-auto">
              <button
                type="button"
                className="fixed z-[999] top-2 right-2 bg-white p-2 rounded-full bg-opacity-50"
                onClick={() => setIsOpen(false)}
              >
                <XIcon className="w-4 h-4" />
              </button>

              {/* Widget */}
              <section className="flex-1 flex flex-col">
                {invitation.widgets.map(widget => {
                  if (widget.type === "INSTA_POST") {
                    return <InstaPostItem key={widget.id} widget={widget} />;
                  } else if (widget.type === "INSTA_MAP") {
                    return <InstaMapItem key={widget.id} widget={widget} />;
                  } else if (widget.type === "INSTA_COVER") {
                    return <InstaCoverItem key={widget.id} widget={widget} />;
                  } else if (widget.type === "INSTA_GREETING") {
                    return (
                      <InstaGreetingItem key={widget.id} widget={widget} />
                    );
                  }
                })}
              </section>
              {/* Widget */}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default PreviewModal;
