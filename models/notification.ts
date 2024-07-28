import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  checkbox,
  text,
  timestamp,
  relationship,
  select,
} from "@keystone-6/core/fields";

const Notification: ListConfig<Lists.Notification.TypeInfo<any>, any> = list({
  access: {
    operation: {
      query: ({ session }) => !!session?.data.isAdmin,
      create: ({ session }) => !!session?.data.isAdmin,
      update: ({ session }) => !!session?.data.isAdmin,
      delete: ({ session }) => !!session?.data.isAdmin,
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
      ],
      db: { map: "my_select" },
      validation: { isRequired: true },
      isIndexed: true,
      ui: { displayMode: "select" },
    }),
    description: text({ validation: { isRequired: true } }),
    notificationTime: timestamp({}),
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
    user: relationship({ ref: "User.notifications", many: true }),
    //goal: relationship({ ref: "User.goals", many: true }),
  },
});

// Acceptance Criteria:
// There is a model for Notification in the backend
// See the notifications in the UI below
// Notifications need (these are just suggestions, feel free to make a proposal)
// User
// Type
// Text
// Status? (new, seen, dismissed, archived, etc)
// Goal / Activity?
// CreatedAt
// ArchivedAt
