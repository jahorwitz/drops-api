import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  text,
  timestamp,
  relationship,
  select,
  integer,
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
        { label: "Medication", value: "Medicaton" },
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
    notificationTime: text({
      validation: { isRequired: true },
    }),
    duration: integer({
      validation: { isRequired: false },
      defaultValue: 0,
    }),
    reminder: select({
      type: "enum",
      options: [
        { label: "15 minutes before", value: "min15" },
        { label: "30 minutes before", value: "min30" },
        { label: "1 hour before", value: "hour1" },
        { label: "2 hours before", value: "hour2" },
        { label: "3 hours before", value: "hour3" },
      ],
      validation: { isRequired: false },
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    status: select({
      options: [
        { label: "New", value: "new" },
        { label: "Seen", value: "seen" },
        { label: "Dismissed", value: "dismissed" },
        { label: "Archived", value: "archived" },
      ],
      defaultValue: "new",
    }),
    archivedAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    user: relationship({ ref: "User.notifications", many: false }),
  },
});
