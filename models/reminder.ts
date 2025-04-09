import { list } from "@keystone-6/core";
import { text, relationship, timestamp, select } from "@keystone-6/core/fields";

export const Reminder = list({
  access: {
    operation: {
      query: ({ session }) => !!session,
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
    filter: {
      query: ({ session }) => ({
        user: { id: { equals: session?.data.id } },
      }),
    },
  },
  hooks: {
    /**
     * Automatically connect the logged-in user when creating a new reminder
     */
    resolveInput: async ({ operation, resolvedData, context }) => {
      if (operation === "create") {
        return {
          ...resolvedData,
          user: { connect: { id: context.session?.data.id } },
        };
      }
      return resolvedData;
    },
  },
  fields: {
    label: text({ validation: { isRequired: true } }),
    type: select({
      options: [
        { label: "Meal", value: "meal" },
        { label: "Medication", value: "medication" },
        { label: "Exercise", value: "exercise" },
      ],
      validation: { isRequired: true },
      defaultValue: "meal",
    }),
    time: text({ validation: { isRequired: true } }),
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    user: relationship({ ref: "User.reminders" }),
  },
});
