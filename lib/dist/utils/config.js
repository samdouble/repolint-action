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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.configSchema = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const zod_1 = require("zod");
const rules_1 = require("../rules");
exports.configSchema = zod_1.z.object({
    rules: rules_1.ruleConfigSchema.optional().default({}),
});
const getConfig = () => {
    const workspaceRoot = process.env.GITHUB_WORKSPACE || process.cwd();
    const configPath = path.join(workspaceRoot, 'repolint.json');
    if (!fs.existsSync(configPath)) {
        throw new Error(`repolint.json not found at ${configPath}`);
    }
    console.info(`Found repolint.json at ${configPath}`);
    const configContent = fs.readFileSync(configPath, 'utf-8');
    const parsed = JSON.parse(configContent);
    const result = exports.configSchema.safeParse(parsed);
    if (!result.success) {
        throw new Error(`Invalid repolint.json: ${result.error.message}`);
    }
    return result.data;
};
exports.getConfig = getConfig;
