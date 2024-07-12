"use client";

import { ROLES } from "@/constants";
import { useEventForm } from "../_hooks/EventFormContext";

const RolesRadio = () => {
  const { eventForm, ownerRolesType, handleOwnerRoleChange } = useEventForm();

  return (
    <div className="flex p-1 bg-slate-100 border border-slate-200 rounded-lg">
      <label
        htmlFor={ROLES.groomBride}
        className="flex-1 group relative cursor-pointer h-10"
      >
        <input
          type="radio"
          name="roles"
          id={ROLES.groomBride}
          className="peer absolute opacity-0"
          checked={ownerRolesType === ROLES.groomBride}
          onChange={() => handleOwnerRoleChange(ROLES.groomBride)}
          aria-label="신랑/신부"
          aria-checked={ownerRolesType === ROLES.groomBride}
        />
        <span className="flex-center h-full w-full text-slate-500 border border-transparent peer-checked:border-slate-200 peer-checked:bg-white peer-checked:text-slate-900">
          신랑/신부
        </span>
      </label>
      <label
        htmlFor={ROLES.brideBride}
        className="flex-1 group relative cursor-pointer h-10"
      >
        <input
          type="radio"
          name="roles"
          id={ROLES.brideBride}
          className="peer absolute opacity-0"
          checked={ownerRolesType === ROLES.brideBride}
          onChange={() => handleOwnerRoleChange(ROLES.brideBride)}
          aria-label="신부/신부"
          aria-checked={ownerRolesType === ROLES.brideBride}
        />
        <span className="flex-center h-full w-full text-slate-500 border border-transparent peer-checked:border-slate-200 peer-checked:bg-white peer-checked:text-slate-900">
          신부/신부
        </span>
      </label>
      <label
        htmlFor={ROLES.groomGroom}
        className="flex-1 group relative cursor-pointer h-10"
      >
        <input
          type="radio"
          name="roles"
          id={ROLES.groomGroom}
          className="peer absolute opacity-0"
          checked={ownerRolesType === ROLES.groomGroom}
          onChange={() => handleOwnerRoleChange(ROLES.groomGroom)}
          aria-label="신랑/신랑"
          aria-checked={ownerRolesType === ROLES.groomGroom}
        />
        <span className="flex-center h-full w-full text-slate-500 border border-transparent peer-checked:border-slate-200 peer-checked:bg-white peer-checked:text-slate-900">
          신랑/신랑
        </span>
      </label>
    </div>
  );
};

export default RolesRadio;
