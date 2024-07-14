"use client";

import { ROLES } from "@/constants";
import { Roles } from "@/schemas/pagesisters";
import { useTemplateFormContext } from "../_hooks/TemplateFormContext";
import logger from "@/utils/logger";

const RolesRadio = () => {
  const { ownerRolesType, handleOwnerRoleChange } = useTemplateFormContext();

  const handleRadioChange = (newRoles: Roles) => () => {
    logger.log("RolesRadio", newRoles);
    handleOwnerRoleChange(newRoles);
  };

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
          onChange={handleRadioChange(ROLES.groomBride)}
          aria-label="신랑/신부"
          aria-checked={ownerRolesType === ROLES.groomBride}
        />
        <span className="flex-center h-full w-full text-slate-500 border border-transparent peer-checked:border-slate-200 peer-checked:bg-white peer-checked:text-slate-900 rounded-md text-sm font-bold">
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
          onChange={handleRadioChange(ROLES.brideBride)}
          aria-label="신부/신부"
          aria-checked={ownerRolesType === ROLES.brideBride}
        />
        <span className="flex-center h-full w-full text-slate-500 border border-transparent peer-checked:border-slate-200 peer-checked:bg-white peer-checked:text-slate-900 rounded-md text-sm font-bold">
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
          onChange={handleRadioChange(ROLES.groomGroom)}
          aria-label="신랑/신랑"
          aria-checked={ownerRolesType === ROLES.groomGroom}
        />
        <span className="flex-center h-full w-full text-slate-500 border border-transparent peer-checked:border-slate-200 peer-checked:bg-white peer-checked:text-slate-900 rounded-md text-sm font-bold">
          신랑/신랑
        </span>
      </label>
    </div>
  );
};

export default RolesRadio;
