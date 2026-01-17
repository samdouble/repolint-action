import type { getOctokit } from '@actions/github';
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
import { z } from 'zod';
export declare const licenseExistsOptionsSchema: z.ZodObject<{
    caseSensitive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type LicenseExistsOptions = z.infer<typeof licenseExistsOptionsSchema>;
type Octokit = ReturnType<typeof getOctokit>;
type Repository = RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data'][number];
export declare const licenseExists: (octokit: Octokit, repository: Repository, ruleOptions: LicenseExistsOptions) => Promise<boolean>;
export {};
//# sourceMappingURL=license-exists.d.ts.map