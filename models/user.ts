import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  text,
  password,
  timestamp,
  select,
  integer,
  relationship,
  multiselect,
  checkbox,
} from "@keystone-6/core/fields";

export const User: ListConfig<Lists.User.TypeInfo<any>, any> = list({
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
    filter: {
      query: ({ session }) => ({
        id: { equals: session.data.id },
      }),
    },
    item: {
      update: ({ session, item }) => item.id === session.data.id,
      delete: ({ session, item }) => item.id === session.data.id,
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
      label: "Weight (lbs)",
    }),
    height: integer({
      validation: { isRequired: false },
      label: "Height (inches)",
      ui: {
        itemView: { fieldMode: "edit" },
      },
    }),
    sex: select({
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      validation: { isRequired: false },
    }),
    diabetesType: multiselect({
      type: "enum",
      options: [
        { label: "Type 1", value: "type1" },
        { label: "Type 2", value: "type2" },
        { label: "Gestational", value: "gestational" },
      ],
    }),
    isRegistrationComplete: checkbox({
      defaultValue: false,
      label: "Is Registration Complete",
    }),
    isOnboardingComplete: checkbox({
      defaultValue: false,
      label: "Is Onboarding Complete",
    }),
    goals: relationship({ ref: "Goal.user", many: true }),
    notifications: relationship({ ref: "Notification.user", many: true }),
    activities: relationship({ ref: "Activity.user", many: true }),
    medications: relationship({ ref: "Medication.user", many: true }),
    //diet-logs
    //add relationship to user
  },
});
