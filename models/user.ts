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
    fastingBloodSugarMin: integer({
      validation: { isRequired: true },
      defaultValue: 70,
      label: "Fasting Blood Sugar Minimum (mg/dL)",
    }),
    fastingBloodSugarMax: integer({
      validation: { isRequired: true },
      defaultValue: 100,
      label: "Fasting Blood Sugar Maximum (mg/dL)",
    }),
    postprandialBloodSugarMin: integer({
      validation: { isRequired: true },
      defaultValue: 100,
      label: "Postprandial Blood Sugar Minimum (mg/dL)",
    }),
    postprandialBloodSugarMax: integer({
      validation: { isRequired: true },
      defaultValue: 180,
      label: "Postprandial Blood Sugar Maximum (mg/dL)",
    }),
    dietMeals: integer({
      validation: { isRequired: false },
      defaultValue: 3,
      label: "Daily Meals Target",
    }),
    dietSnacks: integer({
      validation: { isRequired: false },
      defaultValue: 2,
      label: "Daily Snacks Target",
    }),
    dietCarbs: integer({
      validation: { isRequired: false },
      defaultValue: 200,
      label: "Daily Carbohydrates Target (g)",
    }),
    dietFiber: integer({
      validation: { isRequired: false },
      defaultValue: 25,
      label: "Daily Fiber Target (g)",
    }),
    dietWater: integer({
      validation: { isRequired: false },
      defaultValue: 8,
      label: "Daily Cups of Water",
    }),
    dietCalories: integer({
      validation: { isRequired: false },
      defaultValue: 2500,
      label: "Daily Calorie Limit (kCal)",
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
    goals: relationship({ ref: "Goal.user", many: true }),
    notifications: relationship({ ref: "Notification.user", many: true }),
    activities: relationship({ ref: "Activity.user", many: true }),
    medications: relationship({ ref: "Medication.user", many: true }),
  },
});
