export { getConfig, configSchema, type Config } from './utils/config';
export { rulesMapper } from './rulesMapper';
export { readmeExists } from './rules/readme-exists';
export { licenseExists } from './rules/license-exists';
export { fileExists } from './rules/file-exists';
import type { getOctokit } from '@actions/github';
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
import { Config } from './utils/config';
export type Octokit = ReturnType<typeof getOctokit>;
export type Repository = RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data'][number];
export interface RepolintResult {
    repository: string;
    results: {
        rule: string;
        passed: boolean;
    }[];
}
/**
 * Run repolint rules against a single repository
 */
export declare function runRulesForRepo(octokit: Octokit, repo: Repository, config: Config): Promise<RepolintResult>;
/**
 * Run repolint against all accessible repositories
 */
export declare function runRepolint(octokit: Octokit, config: Config): Promise<RepolintResult[]>;
//# sourceMappingURL=index.d.ts.map