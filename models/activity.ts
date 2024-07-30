import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  integer,
  text,
  timestamp,
  relationship,
} from "@keystone-6/core/fields";

export const Activity: ListConfig<any> = list({
  access: {
    operation: {
      query: ({ session }) => !!session,
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
    item: {
      update: ({ session, item }) => item.userId === session.data.id,
      delete: ({ session, item }) => item.userId === session.data.id,
    },
  },
  fields: {
    name: text({
      defaultValue: "...",
      db: { map: "my_text", nativeType: "VarChar(40)" },
      validation: { isRequired: true },
      isIndexed: "unique",
      ui: { displayMode: "textarea" },
    }),
    amount: integer({
      defaultValue: 0,
      db: { map: "my_integer" },
      isIndexed: "unique",
    }),
    unitOfMeasure: text({
      defaultValue: "...",
      db: { map: "text", nativeType: "VarChar(40)" },
      isIndexed: "unique",
      ui: { displayMode: "textarea" },
    }),
    startTime: timestamp({
      defaultValue: "2020-10-05T00:00:00-07:00",
      db: { map: "my_start_timestamp", updatedAt: true },
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    endTime: timestamp({
      defaultValue: "2020-10-05T00:00:00-07:00",
      db: { map: "my_end_timestamp", updatedAt: true },
      isIndexed: "unique",
    }),
  },
});
