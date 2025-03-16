import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  timestamp,
  relationship,
  select,
  integer,
  text,
} from "@keystone-6/core/fields";

export const NotificationTime: ListConfig<
  Lists.NotificationTime.TypeInfo<any>,
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
        notification: {
          user: {
            id: {
              equals: session.data.id,
            },
          },
        },
      }),
    },
    item: {
      create: async ({ session, inputData, context }) => {
        const notification = await context.query.Notification.findOne({
          where: { id: inputData.notification?.connect?.id },
          query: "user { id }",
        });
        return notification?.user?.id === session.data.id;
      },
      update: async ({ session, item, context }) => {
        const notification = await context.query.Notification.findOne({
          where: { id: item.notificationId },
          query: "user { id }",
        });
        return notification?.user?.id === session.data.id;
      },
      delete: async ({ session, item, context }) => {
        const notification = await context.query.Notification.findOne({
          where: { id: item.notificationId },
          query: "user { id }",
        });
        return notification?.user?.id === session.data.id;
      },
    },
  },
  fields: {
    notificationTime: text({
      validation: { isRequired: true },
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
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    archivedAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    notification: relationship({ ref: "Notification.times", many: false }),
  },
});
