import { group, list, ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  text,
  select,
  integer,
  multiselect,
  relationship,
} from "@keystone-6/core/fields";

export const Goal: ListConfig<Lists.Goal.TypeInfo> = list({
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
    type: select({
      type: "enum",
      options: [
        { label: "Exercise", value: "Exercise" },
        { label: "Diet", value: "Diet" },
      ],
      db: { map: "my_select" },
      validation: { isRequired: true },
      isIndexed: true,
      ui: { displayMode: "select" },
    }),
    name: text({ validation: { isRequired: true } }),
    ...group({
      label: "Metric",
      description: "Metric",
      fields: {
        amount: integer({ validation: { isRequired: true } }),
        unitOfMeasure: text(),
      },
    }),
    daysOfWeek: multiselect({
      type: "enum",
      options: [
        { label: "Sunday", value: "Sunday" },
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
      ],
      db: { map: "my_multiselect" },
    }),
    user: relationship({ ref: "User.goals", many: false }),
  },
});
