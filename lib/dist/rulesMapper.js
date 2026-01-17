"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rulesMapper = void 0;
const file_exists_1 = require("./rules/file-exists");
const license_exists_1 = require("./rules/license-exists");
const readme_exists_1 = require("./rules/readme-exists");
exports.rulesMapper = {
    'file-exists': file_exists_1.fileExists,
    'license/exists': license_exists_1.licenseExists,
    'readme/exists': readme_exists_1.readmeExists,
};
