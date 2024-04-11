import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import { integer, relationship, text } from "@keystone-6/core/fields";

export const Medication: ListConfig<Lists.Medication.TypeInfo<any>, any> = list(
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
      amount: integer({ validation: { isRequired: true } }),
      unitOfMeasure: text({ validation: { isRequired: true } }),
      hour: integer({ validation: { isRequired: true, min: 0, max: 12 } }),
      minutes: integer({ validation: { isRequired: true, min: 0, max: 59 } }),
      period: text({
        validation: { isRequired: true, length: { min: 2, max: 2 } },
      }),
      createdBy: relationship({ ref: "User", many: false }),
    },
  }
);

// dropdown select option for unitOfMeasure, if we were to use a list from an API source or something

// unitOfMeasure: select({
//   validation: { isRequired: true },
//   type: "enum",
//   options: [
//     { label: "%", value: "percent" },
//     { label: "AU", value: "au" },
//     { label: "AU/mL", value: "au/ml" },
//     { label: "bar", value: "bar" },
//     { label: "BAU", value: "bau" },
//     { label: "BAU/mL", value: "bau/ml" },
//     { label: "bead", value: "bead" },
//     { label: "%", value: "percent" },
//     // etc, from list of medication dose units
//   ],
// }),

// https://www.openmhealth.org/schemas/omh_medication-dose-unit/
