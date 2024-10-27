import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import { integer, relationship, text } from "@keystone-6/core/fields";

export const Medication: ListConfig<Lists.Medication.TypeInfo<any>, any> = list(
  {
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
      amount: integer({ validation: { isRequired: true } }),
      unitOfMeasure: text({ validation: { isRequired: true } }),
      time: text({ validation: { isRequired: true } }),
      user: relationship({ ref: "User.medications", many: false }),
    },
  },
);
