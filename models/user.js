"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const core_1 = require("@keystone-6/core");
const fields_1 = require("@keystone-6/core/fields");
exports.User = (0, core_1.list)({
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
        email: (0, fields_1.text)({
            validation: { isRequired: true },
            isIndexed: "unique",
        }),
        password: (0, fields_1.password)({
            validation: {
                length: { min: 5, max: 20 },
                isRequired: true,
                rejectCommon: true,
            },
            bcrypt: require("bcryptjs"),
        }),
        isAdmin: (0, fields_1.checkbox)({ defaultValue: false }),
        createdAt: (0, fields_1.timestamp)({
            defaultValue: { kind: "now" },
        }),
        lastLoginDate: (0, fields_1.timestamp)({
            defaultValue: { kind: "now" },
        }),
        activities: (0, fields_1.relationship)({ ref: "Activity.user", many: true }),
    },
});
