import { list, ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";

import {
  checkbox,
  text,
  password,
  timestamp,
  relationship,
} from "@keystone-6/core/fields";

export const User: ListConfig<any> = list({
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
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    password: password({
      validation: {
        length: { min: 5, max: 20 },
        isRequired: true,
        rejectCommon: true,
      },
      bcrypt: require("bcryptjs"),
    }),
    isAdmin: checkbox({ defaultValue: false }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    lastLoginDate: timestamp({
      defaultValue: { kind: "now" },
    }),
    activities: relationship({ ref: "Activity.user", many: true }),
  },
});
