import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import { integer, text, timestamp } from "@keystone-6/core/fields";

export const Activity: ListConfig<Lists.Activity.TypeInfo<any>, any> = list(
  {
    access: {
      operation: {
        query: ({ session }) => !!session?.data.isAdmin,
        create: ({ session }) => !!session?.data.isAdmin,
        update: ({ session }) => !!session?.data.isAdmin,
        delete: ({ session }) => !!session?.data.isAdmin,
      },
    },
    fields: {
      name: text({ validation: { isRequired: true } }),
      amount: integer(),
      unitOfMeasure: text(),
      startTime: timestamp({ validation: { isRequired: true } }),
      endTime: timestamp(),
    },
  },
);
