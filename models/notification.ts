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
        { label: "Activity", value: "Activity" },
        { label: "Diet", value: "Diet" },
        { label: "Glucose", value: "Glucose" },
        { label: "Medication", value: "Medication" },
        { label: "Other", value: "other" },
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
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],
      defaultValue: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    }),
    user: relationship({ ref: "User.notifications", many: false }),
    times: relationship({ ref: "NotificationTime.notification", many: true }),
  },
});
