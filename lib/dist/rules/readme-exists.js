"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readmeExists = exports.readmeExistsOptionsSchema = void 0;
const zod_1 = require("zod");
const file_exists_1 = require("./file-exists");
exports.readmeExistsOptionsSchema = zod_1.z.object({
    caseSensitive: zod_1.z.boolean().optional().default(false),
    path: zod_1.z.string().optional().default('README.md'),
});
const readmeExists = (octokit, repository, ruleOptions) => __awaiter(void 0, void 0, void 0, function* () {
    let sanitizedRuleOptions;
    try {
        sanitizedRuleOptions = exports.readmeExistsOptionsSchema.parse(ruleOptions);
    }
    catch (error) {
        throw new Error(`Invalid rule options: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    return yield (0, file_exists_1.fileExists)(octokit, repository, sanitizedRuleOptions);
});
exports.readmeExists = readmeExists;
