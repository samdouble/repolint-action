import * as core from '@actions/core';
import type { getOctokit } from '@actions/github';
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
import { z } from 'zod';

export const fileExistsOptionsSchema = z.object({
  caseInsensitive: z.boolean().optional().default(false),
  path: z.string(),
});

export type fileExistsOptions = z.infer<typeof fileExistsOptionsSchema>;

type Octokit = ReturnType<typeof getOctokit>;
type Repository = RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data'][number];

export const fileExists = async (octokit: Octokit, repository: Repository, ruleOptions: fileExistsOptions) => {
  const { data: contents } = await octokit.rest.repos.getContent({
    owner: repository.owner.login,
    repo: repository.name,
    path: '',
  });
  let sanitizedRuleOptions: fileExistsOptions;
  try {
    sanitizedRuleOptions = fileExistsOptionsSchema.parse(ruleOptions);
  } catch (error) {
    core.setFailed(`Invalid rule options: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
  if (Array.isArray(contents)) {
    const file = contents
      .filter(item => item.type === 'file')
      .find(item => {
        return sanitizedRuleOptions.caseInsensitive
          ? item.name.toLowerCase() === sanitizedRuleOptions.path.toLowerCase()
          : item.name === sanitizedRuleOptions.path;
      });
    if (file) {
      return true;
    }
  }
  return false;
};
