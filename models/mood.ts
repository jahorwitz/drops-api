import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  integer,
  text,
  timestamp,
  relationship,
} from "@keystone-6/core/fields";

export const Mood: ListConfig<Lists.Mood.TypeInfo<any>, any> = list({
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
    name: text({ validation: { isRequired: true } }),
    amount: integer({
      defaultValue: 0,
    }),
    currentMood: text({
      defaultValue: "",
    }),
    checkTime: timestamp({
      defaultValue: { kind: "now" },
      db: { map: "my_check_timestamp", updatedAt: true },
      validation: { isRequired: true },
    }),
    user: relationship({
      ref: "User.moods",
      many: false,
      db: { foreignKey: { map: "userid" } },
    }),
  },
});