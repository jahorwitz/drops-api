import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  checkbox,
  text,
  password,
  timestamp,
  select,
  integer,
} from "@keystone-6/core/fields";

export const User: ListConfig<Lists.User.TypeInfo<any>, any> = list({
  access: {
    operation: {
      query: ({ session }) => !!session?.data.isAdmin,
      create: ({ session }) => !!session?.data.isAdmin,
      update: ({ session }) => !!session?.data.isAdmin,
      delete: ({ session }) => !!session?.data.isAdmin,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    password: password({
      validation: {
        length: { min: 10, max: 100 },
        isRequired: true,
        rejectCommon: true,
      },
      bcrypt: require("bcryptjs"),
    }),
    isAdmin: checkbox({ defaultValue: true }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    lastLoginDate: timestamp({
      defaultValue: { kind: "now" },
    }),
    dateOfBirth: timestamp({
      validation: { isRequired: false },
    }),
    weight: integer({
      validation: { isRequired: false },
      label: "Weight (lbs)"
    }),
    height: text({
      validation: { isRequired: false },
      label: "Height (ft and in)",
      ui: {
        itemView: { fieldMode: 'edit' }
      }
    }),
    sex: select({
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
      ],
      validation: { isRequired: false },
    }),
    diabetesType: select({
      options: [
        { label: 'Type 1', value: 'type1' },
        { label: 'Type 2', value: 'type2' },
        { label: 'Gestational', value: 'gestational' }
      ],
      validation: { isRequired: false },
    }),

  },
});