import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import { text, timestamp, relationship, select } from "@keystone-6/core/fields";

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
        { label: "Mood", value: "Mood" },
        { label: "Other", value: "other" },
      ],
      db: { map: "my_select" },
      validation: { isRequired: true },
      isIndexed: true,
      ui: { displayMode: "select" },
    }),
    description: text({ validation: { isRequired: true } }),
    notificationTime: timestamp({
      defaultValue: { kind: "now" },
      validation: { isRequired: true },
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
