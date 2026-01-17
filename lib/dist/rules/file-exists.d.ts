import type { getOctokit } from '@actions/github';
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
import { z } from 'zod';
export declare const fileExistsOptionsSchema: z.ZodObject<{
    caseSensitive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    path: z.ZodString;
}, z.core.$strip>;
export type fileExistsOptions = z.infer<typeof fileExistsOptionsSchema>;
type Octokit = ReturnType<typeof getOctokit>;
type Repository = RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data'][number];
export declare const fileExists: (octokit: Octokit, repository: Repository, ruleOptions: fileExistsOptions) => Promise<boolean>;
export {};
//# sourceMappingURL=file-exists.d.ts.map