import * as core from '@actions/core';
import * as github from '@actions/github';

export async function main() {
  core.info(`Running repolint action`);

  const token = core.getInput('github-token', { required: true });
  const octokit = github.getOctokit(token);

  const { owner } = github.context.repo;

  core.info(`Fetching repositories for organization: ${owner}`);

  const repos = await octokit.paginate(octokit.rest.repos.listForOrg, {
    org: owner,
    per_page: 100,
  });

  core.info(`Found ${repos.length} repositories:`);
  for (const repo of repos) {
    core.info(`  - ${repo.name}`);
  }
}

main();
