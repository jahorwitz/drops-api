import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  text,
  relationship,
  select,
  multiselect,
} from "@keystone-6/core/fields";

export const Notification: ListConfig<
  Lists.Notification.TypeInfo<any>,
  any
> = list({
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
        { label: "Glucose", value: "Glucose" },
        { label: "Medication", value: "Medication" },
        { label: "Other", value: "Other" },
      ],
      db: { map: "my_select" },
      validation: { isRequired: true },
      isIndexed: true,
      ui: { displayMode: "select" },
    }),
    name: text({ validation: { isRequired: true } }),
    days: multiselect({
      type: "enum",
      options: [
        { label: "MONDAY", value: "MONDAY" },
        { label: "TUESDAY", value: "TUESDAY" },
        { label: "WEDNESDAY", value: "WEDNESDAY" },
        { label: "THURSDAY", value: "THURSDAY" },
        { label: "FRIDAY", value: "FRIDAY" },
        { label: "SATURDAY", value: "SATURDAY" },
        { label: "SUNDAY", value: "SUNDAY" },
      ],
      defaultValue: [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ],
    }),
    user: relationship({ ref: "User.notifications", many: false }),
    times: relationship({ ref: "NotificationTime.notification", many: true }),
  },
});
