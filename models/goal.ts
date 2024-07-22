import { group, list, ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  text,
  select,
  integer,
  multiselect,
  relationship,
} from "@keystone-6/core/fields";

export const Goal: ListConfig<Lists.Goal.TypeInfo<any>, any> = list({
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
        { label: "Exercise", value: "Exercise" },
        { label: "Diet", value: "Diet" },
      ],
      db: { map: "my_select" },
      validation: { isRequired: true },
      isIndexed: true,
      ui: { displayMode: "select" },
    }),
    name: text({ validation: { isRequired: true } }),
    ...group({
      label: "Metric",
      description: "Metric",
      fields: {
        amount: integer({ validation: { isRequired: true } }),
        unitOfMeasure: text(),
      },
    }),
    daysOfWeek: multiselect({
      type: "enum",
      options: [
        { label: "Sunday", value: "Sunday" },
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
      ],
      db: { map: "my_multiselect" },
    }),
    user: relationship({ ref: "User.goals", many: true }),
  },
});

//Keystone Examples Notes on authorizing certain actions
// // Validate there is a user with a valid session
// const isUser = ({ session }: { session: Session }) => !!session?.data.id;

// // Validate the current user is an Admin
// const isAdmin = ({ session }: { session: Session }) =>
//   Boolean(session?.data.isAdmin);

// // Validate the current user is updating themselves
// const isPerson = ({ session, item }: { session: Session; item: PersonData }) =>
//   session?.data.id === item.id;

// // Validate the current user is an Admin, or updating themselves
// const isAdminOrPerson = ({
//   session,
//   item,
// }: {
//   session: Session;
//   item: PersonData;
// }) => isAdmin({ session }) || isPerson({ session, item });
