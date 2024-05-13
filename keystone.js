"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const core_1 = require("@keystone-6/core");
dotenv_1.default.config();
const auth_1 = require("./auth");
const Models = __importStar(require("./models"));
exports.default = (0, auth_1.withAuth)((0, core_1.config)({
    server: {
        port: 8080,
        cors: {
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        },
    },
    db: {
        provider: "mysql",
        url: `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`,
        enableLogging: true,
        idField: { kind: "uuid" },
        useMigrations: true,
    },
    telemetry: false,
    graphql: {
        playground: true,
        apolloConfig: {
            introspection: true,
        },
    },
    storage: {
        s3_file_storage: {
            kind: "s3",
            type: "file",
            bucketName: process.env.S3_BUCKET_NAME || "drops-keystonejs",
            region: process.env.S3_REGION || "us-east-2",
            accessKeyId: process.env.S3_ACCESS_KEY_ID || "keystone",
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "keystone",
            signed: { expiry: 5000 },
            forcePathStyle: true,
        },
        s3_image_storage: {
            kind: "s3",
            type: "image",
            bucketName: process.env.S3_BUCKET_NAME || "drops-keystonejs",
            region: process.env.S3_REGION || "us-east-2",
            accessKeyId: process.env.S3_ACCESS_KEY_ID || "keystone",
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "keystone",
            signed: { expiry: 5000 },
            forcePathStyle: true,
        },
    },
    lists: Models,
    session: auth_1.session,
}));
