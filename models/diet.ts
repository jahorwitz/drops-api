import { list } from "@keystone-6/core";
import { integer, relationship, timestamp } from "@keystone-6/core/fields";

export const Diet = list({
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
    mealsPerDay: integer(),
    snacksPerDay: integer(),
    carbsPerDay: integer(), // grams
    fiberPerDay: integer(), // grams
    waterPerDay: integer(), // cups
    calorieLimit: integer(), // kcal
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    user: relationship({ ref: "User.diet" }),
  },
});
