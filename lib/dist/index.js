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
exports.fileExists = exports.licenseExists = exports.readmeExists = exports.rulesMapper = exports.configSchema = exports.getConfig = void 0;
exports.runRulesForRepo = runRulesForRepo;
exports.runRepolint = runRepolint;
// Main exports for programmatic use
var config_1 = require("./utils/config");
Object.defineProperty(exports, "getConfig", { enumerable: true, get: function () { return config_1.getConfig; } });
Object.defineProperty(exports, "configSchema", { enumerable: true, get: function () { return config_1.configSchema; } });
var rulesMapper_1 = require("./rulesMapper");
Object.defineProperty(exports, "rulesMapper", { enumerable: true, get: function () { return rulesMapper_1.rulesMapper; } });
var readme_exists_1 = require("./rules/readme-exists");
Object.defineProperty(exports, "readmeExists", { enumerable: true, get: function () { return readme_exists_1.readmeExists; } });
var license_exists_1 = require("./rules/license-exists");
Object.defineProperty(exports, "licenseExists", { enumerable: true, get: function () { return license_exists_1.licenseExists; } });
var file_exists_1 = require("./rules/file-exists");
Object.defineProperty(exports, "fileExists", { enumerable: true, get: function () { return file_exists_1.fileExists; } });
const rulesMapper_2 = require("./rulesMapper");
/**
 * Run repolint rules against a single repository
 */
function runRulesForRepo(octokit, repo, config) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const results = [];
        for (const [rule, ruleOptions] of Object.entries((_a = config.rules) !== null && _a !== void 0 ? _a : {})) {
            const ruleFunction = rulesMapper_2.rulesMapper[rule];
            if (!ruleFunction) {
                throw new Error(`Rule ${rule} not found`);
            }
            const passed = yield ruleFunction(octokit, repo, ruleOptions);
            results.push({ rule, passed });
        }
        return {
            repository: repo.full_name,
            results,
        };
    });
}
/**
 * Run repolint against all accessible repositories
 */
function runRepolint(octokit, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: repos } = yield octokit.rest.repos.listForAuthenticatedUser({
            visibility: 'all',
            per_page: 100,
        });
        const results = [];
        for (const repo of repos) {
            const repoResult = yield runRulesForRepo(octokit, repo, config);
            results.push(repoResult);
        }
        return results;
    });
}
