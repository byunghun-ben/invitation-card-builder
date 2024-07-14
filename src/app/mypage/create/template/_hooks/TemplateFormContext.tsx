"use client";

import { ROLE, ROLES } from "@/constants";
import { ownerSchema, Roles, weddingHallSchema } from "@/schemas/pagesisters";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useCallback, useMemo } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { z } from "zod";

const templateSchema = z.object({
  owners: z.array(ownerSchema),
  location: z.nullable(weddingHallSchema),
  eventAt: z.object({
    date: z.date(),
    time: z.string(),
  }),
});

export type TemplateFormValues = z.infer<typeof templateSchema>;

export const TemplateFormContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
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
      eventAt: {
        time: "12:00",
      },
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

export const useTemplateFormContext = () => {
  const form = useFormContext<TemplateFormValues>();

  const { control, getValues, setValue } = form;

  const { owners = [] } = useWatch({ control });

  const ownerRolesType = useMemo<Roles>(() => {
    const isBride = owners.every(owner => owner.role === ROLE.BRIDE);
    const isGroom = owners.every(owner => owner.role === ROLE.GROOM);

    if (isBride) {
      return ROLES.brideBride;
    }

    if (isGroom) {
      return ROLES.groomGroom;
    }

    return ROLES.groomBride;
  }, [owners]);

  const handleOwnerRoleChange = useCallback(
    (roles: Roles) => {
      const { owners: prevOwners } = getValues();

      const newOwners = prevOwners.map(owner => {
        if (roles === ROLES.groomBride) {
          const isFirstOwner = owner.id === "firstOwner";

          return isFirstOwner
            ? { ...owner, role: ROLE.GROOM }
            : { ...owner, role: ROLE.BRIDE };
        }

        if (roles === ROLES.brideBride) {
          return { ...owner, role: ROLE.BRIDE };
        }

        if (roles === ROLES.groomGroom) {
          return { ...owner, role: ROLE.GROOM };
        }

        return owner;
      });

      setValue("owners", newOwners);
    },
    [getValues, setValue],
  );

  const handleOwnerOrderChange = useCallback(() => {
    const { owners: prevOwners } = getValues();
    setValue("owners", prevOwners.reverse());
  }, [getValues, setValue]);

  const handleOwnerNameChange = useCallback(() => {}, []);

  if (!form) {
    throw new Error(
      "useTemplateFormContext must be used within a TemplateFormContextProvider",
    );
  }

  return {
    form,
    ownerRolesType,
    handleOwnerRoleChange,
    handleOwnerOrderChange,
    handleOwnerNameChange,
  };
};
