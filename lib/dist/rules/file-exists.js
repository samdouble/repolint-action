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
exports.fileExists = exports.fileExistsOptionsSchema = void 0;
const zod_1 = require("zod");
exports.fileExistsOptionsSchema = zod_1.z.object({
    caseSensitive: zod_1.z.boolean().optional().default(false),
    path: zod_1.z.string(),
});
const fileExists = (octokit, repository, ruleOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: contents } = yield octokit.rest.repos.getContent({
        owner: repository.owner.login,
        repo: repository.name,
        path: '',
    });
    let sanitizedRuleOptions;
    try {
        sanitizedRuleOptions = exports.fileExistsOptionsSchema.parse(ruleOptions);
    }
    catch (error) {
        throw new Error(`Invalid rule options: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    if (Array.isArray(contents)) {
        const file = contents
            .filter(item => item.type === 'file')
            .find(item => {
            return sanitizedRuleOptions.caseSensitive
                ? item.name === sanitizedRuleOptions.path
                : item.name.toLowerCase() === sanitizedRuleOptions.path.toLowerCase();
        });
        return !!file;
    }
    return false;
});
exports.fileExists = fileExists;
