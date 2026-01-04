import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'fs';
import * as path from 'path';

const getConfig = () => {
  const workspaceRoot = process.env.GITHUB_WORKSPACE || process.cwd();
  const configPath = path.join(workspaceRoot, 'repolint.json');

  if (!fs.existsSync(configPath)) {
    core.setFailed(`repolint.json not found at ${configPath}`);
    return;
  }

  core.info(`Found repolint.json at ${configPath}`);

  const configContent = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(configContent);
};

export async function main() {
  core.info(`Running repolint action`);

  const config = getConfig();

  core.info(`Loaded configuration: ${JSON.stringify(config, null, 2)}`);

  const token = core.getInput('github-token', { required: true });
  const octokit = github.getOctokit(token);

  core.info(`Fetching repositories accessible to the authenticated token`);

  const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
    visibility: 'all',
    per_page: 100,
  });

  core.info(`Found ${repos.length} repositories:`);
  for (const repo of repos) {
    core.info(`  - ${repo.full_name} (${repo.private ? 'private' : 'public'})`);
  }
}

main();
