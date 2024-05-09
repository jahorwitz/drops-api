import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import {
  integer,
  text,
  timestamp,
  relationship,
} from "@keystone-6/core/fields";

export const Activity: ListConfig<any, any> = list({
  access: {
    operation: {
      query: ({ session }) => !!session,
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    amount: integer(),
    unitOfMeasure: text(),
    startTime: timestamp({ validation: { isRequired: true } }),
    endTime: timestamp(),
    user: relationship({ ref: "User.activities", many: false }),
  },
});
