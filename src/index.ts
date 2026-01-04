import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'fs';
import * as path from 'path';

export const getConfig = () => {
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
    core.info(`==================`);

    try {
      const { data: contents } = await octokit.rest.repos.getContent({
        owner: repo.owner.login,
        repo: repo.name,
        path: '',
      });

      if (Array.isArray(contents)) {
        for (const item of contents) {
          const icon = item.type === 'dir' ? '📁' : '📄';
          core.info(`      ${icon} ${item.name}`);
        }
      }
    } catch (error) {
      core.warning(`Could not fetch contents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

if (process.env.NODE_ENV !== 'test') {
  main();
}
