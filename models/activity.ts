import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  integer,
  text,
  timestamp,
  relationship,
} from "@keystone-6/core/fields";

export const Activity: ListConfig<Lists.Activity.TypeInfo<any>, any> = list({
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
    unitOfMeasure: text({
      defaultValue: "",
    }),
    startTime: timestamp({
      defaultValue: "2020-10-05T00:00:00-07:00",
      db: { map: "my_start_timestamp", updatedAt: true },
      validation: { isRequired: true },
    }),
    endTime: timestamp({
      defaultValue: "2020-10-05T00:00:00-07:00",
      db: { map: "my_end_timestamp", updatedAt: true },
    }),
    user: relationship({
      ref: "User.activity",
      many: false,
      db: { foreignKey: { map: "userid" } },
    }),
  },
});
