"use client";

import { ROLE } from "@/constants";
import { useEventForm } from "../hooks/EventFormContext";
import { HandRaisedIcon } from "@heroicons/react/24/outline";

const ROLE_LABELS = {
  [ROLE.GROOM]: "신랑",
  [ROLE.BRIDE]: "신부",
} as const;

const RolesFieldset = () => {
  const {
    eventForm,
    ownerRolesType,
    handleOwnerOrderChange,
    handleOwnerNameChange,
  } = useEventForm();
  const { owners } = eventForm;

  const showRoleOrderChangeSection = ownerRolesType === "groom-bride";

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    const ownerId = e.currentTarget.dataset.ownerid as string;
    e.dataTransfer.setData("text/plain", ownerId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentOwnerId = e.currentTarget.dataset.ownerid as string;
    const transferOwnerId = e.dataTransfer.getData("text/plain") as string;
    const isSameOwner = currentOwnerId === transferOwnerId;
    if (isSameOwner) {
      return;
    }

    handleOwnerOrderChange();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {owners.map(owner => (
          <label
            key={owner.id}
            htmlFor={`host-name-${owner.id}`}
            className="flex-1 flex flex-col gap-2"
          >
            <span className="flex font-bold">{`${ROLE_LABELS[owner.role]} 이름`}</span>
            <input
              className="relative w-full h-12 px-2 text-slate-700 border rounded border-slate-200 placeholder:text-slate-300"
              type="text"
              name={`host-name-${owner.id}`}
              id={`host-name-${owner.id}`}
              placeholder="이름 입력"
              value={owner.name}
              onChange={e => handleOwnerNameChange(owner.id, e.target.value)}
            />
          </label>
        ))}
      </div>

      {showRoleOrderChangeSection && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">호스트 표기 순서</h3>
            <p className="text-sm text-slate-500">
              드래그해서, 순서를 변경할 수 있어요.
            </p>
          </div>
          <div className="flex gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {owners.map(owner => (
              <button
                key={owner.id}
                className="flex-1 flex-center gap-1 h-10 bg-white text-slate-700 rounded-lg border border-slate-200"
                type="button"
                data-ownerid={owner.id}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                draggable
              >
                <HandRaisedIcon className="w-4 h-4 text-slate-700" />
                <span className="font-bold text-sm text-slate-700">
                  {ROLE_LABELS[owner.role]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RolesFieldset;
