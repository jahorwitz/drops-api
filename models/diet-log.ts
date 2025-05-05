import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  text,
  timestamp,
  relationship,
  select,
  integer,
} from "@keystone-6/core/fields";

export const DietLog: ListConfig<Lists.Notification.TypeInfo<any>, any> = list({
  access: {
    operation: {
      query: ({ session }) => !!session,
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
    filter: {
      query: ({ session }) => ({
        user: {
          id: {
            equals: session.data.id,
          },
        },
      }),
    },
    item: {
      create: ({ session, inputData }) =>
        inputData.user?.connect?.id === session.data.id,
      update: ({ session, item }) => item.userId === session.data.id,
      delete: ({ session, item }) => item.userId === session.data.id,
    },
  },
  fields: {
    mealName: text({ validation: { isRequired: true } }),
    mealDescription: text({ validation: { isRequired: true } }),
    logTime: timestamp({
      defaultValue: { kind: "now" },
      validation: { isRequired: true },
    }),
    calories: integer({ validation: { isRequired: true } }),
    protein: integer(),
    carbs: integer(),
    fiber: integer(),
    sugar: integer(),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    user: relationship({ ref: "User.dietLogs", many: false }),
  },
});
