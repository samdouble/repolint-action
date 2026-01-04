import * as core from '@actions/core';

export async function main() {
  core.info(`Running package reputation action`);

  const message = core.getInput('message');
  core.info(`Using message: "${message}"`);
}
