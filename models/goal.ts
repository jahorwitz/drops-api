import { group, list, ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import { text, select, integer, multiselect } from "@keystone-6/core/fields";

export const Goal: ListConfig<Lists.Goal.TypeInfo<any>, any> = list({
  access: {
    operation: {
      query: ({ session }) => !!session?.data.isAdmin,
      create: ({ session }) => !!session?.data.isAdmin,
      update: ({ session }) => !!session?.data.isAdmin,
      delete: ({ session }) => !!session?.data.isAdmin,
    },
  },
  fields: {
    type: select({
      type: "enum",
      options: [
        { label: "Exercise", value: "Exercise" },
        { label: "Diet", value: "Diet" },
      ],
      //defaultValue: "Choose One",
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
  },
});
