"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const core_1 = require("@keystone-6/core");
const fields_1 = require("@keystone-6/core/fields");
exports.Activity = (0, core_1.list)({
    access: {
        operation: {
            query: ({ session }) => !!session,
            create: ({ session }) => !!session,
            update: ({ session }) => !!session,
            delete: ({ session }) => !!session,
        },
    },
    fields: {
        name: (0, fields_1.text)({ validation: { isRequired: true } }),
        amount: (0, fields_1.integer)(),
        unitOfMeasure: (0, fields_1.text)(),
        startTime: (0, fields_1.timestamp)({ validation: { isRequired: true } }),
        endTime: (0, fields_1.timestamp)(),
        user: (0, fields_1.relationship)({ ref: "User.activities", many: false }),
    },
});
