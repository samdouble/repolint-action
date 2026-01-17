import type { getOctokit } from '@actions/github';
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
import { z } from 'zod';
export declare const readmeExistsOptionsSchema: z.ZodObject<{
    caseSensitive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type ReadmeExistsOptions = z.infer<typeof readmeExistsOptionsSchema>;
type Octokit = ReturnType<typeof getOctokit>;
type Repository = RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data'][number];
export declare const readmeExists: (octokit: Octokit, repository: Repository, ruleOptions: ReadmeExistsOptions) => Promise<boolean>;
export {};
//# sourceMappingURL=readme-exists.d.ts.map