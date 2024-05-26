"use client";

import { ROLE, ROLES } from "@/constants";
import { HallLocation, Owner, Roles } from "@/schemas/pagesisters";
import logger from "@/utils/logger";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type EventForm = {
  owners: Owner[];
  location: HallLocation | null;
  eventAt: string;
};

const eventFormContext = createContext<{
  eventForm: EventForm;
  ownerRolesType: Roles;
  setEventForm: Dispatch<SetStateAction<EventForm>>;
  handleOwnerRoleChange: (newRoles: Roles) => void;
  handleOwnerOrderChange: () => void;
  handleOwnerNameChange: (ownerId: string, name: string) => void;
}>({
  eventForm: {
    owners: [],
    location: null,
    eventAt: "",
  },
  ownerRolesType: ROLES.groomBride,
  setEventForm: () => {},
  handleOwnerRoleChange: () => {},
  handleOwnerOrderChange: () => {},
  handleOwnerNameChange: () => {},
});

export const EventFormContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [eventForm, setEventForm] = useState<EventForm>({
    owners: [
      {
        id: "firstOwner",
        role: ROLE.GROOM,
        name: "",
      },
      {
        id: "secondOwner",
        role: ROLE.BRIDE,
        name: "",
      },
    ],
    location: null,
    eventAt: "",
  });

  const ownerRolesType = useMemo<Roles>(() => {
    const isBrideBride = eventForm.owners.every(
      owner => owner.role === ROLE.BRIDE,
    );

    const isGroomGroom = eventForm.owners.every(
      owner => owner.role === ROLE.GROOM,
    );

    if (isBrideBride) {
      return ROLES.brideBride;
    }

    if (isGroomGroom) {
      return ROLES.groomGroom;
    }

    return ROLES.groomBride;
  }, [eventForm.owners]);

  const handleOwnerRoleChange = useCallback((newRoles: Roles) => {
    switch (newRoles) {
      case ROLES.groomBride: {
        setEventForm(prev => ({
          ...prev,
          owners: prev.owners.map(owner => {
            const isFirstOwner = owner.id === "firstOwner";
            return isFirstOwner
              ? { ...owner, role: ROLE.GROOM }
              : { ...owner, role: ROLE.BRIDE };
          }),
        }));
        break;
      }

      case ROLES.brideBride: {
        setEventForm(prev => ({
          ...prev,
          owners: prev.owners.map(owner => {
            return {
              ...owner,
              role: ROLE.BRIDE,
            };
          }),
        }));
        break;
      }

      case ROLES.groomGroom: {
        setEventForm(prev => ({
          ...prev,
          owners: prev.owners.map(owner => {
            return {
              ...owner,
              role: ROLE.GROOM,
            };
          }),
        }));
        break;
      }

      default: {
        break;
      }
    }
  }, []);

  // 호스트 표기 순서 변경
  const handleOwnerOrderChange = useCallback(() => {
    logger.log("handleOwnerOrderChange");
    setEventForm(prev => ({
      ...prev,
      owners: [prev.owners[1], prev.owners[0]],
    }));
  }, []);

  const handleOwnerNameChange = useCallback((ownerId: string, name: string) => {
    setEventForm(prev => ({
      ...prev,
      owners: prev.owners.map(owner => {
        return owner.id === ownerId ? { ...owner, name } : owner;
      }),
    }));
  }, []);

  return (
    <eventFormContext.Provider
      value={{
        eventForm,
        ownerRolesType,
        setEventForm,
        handleOwnerRoleChange,
        handleOwnerOrderChange,
        handleOwnerNameChange,
      }}
    >
      {children}
    </eventFormContext.Provider>
  );
};

export const useEventForm = () => {
  const value = useContext(eventFormContext);

  if (!value) {
    throw new Error("EventFormContext가 필요합니다.");
  }

  return value;
};
