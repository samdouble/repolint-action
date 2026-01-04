[![CI](https://github.com/samdouble/repolint-action/actions/workflows/checks.yml/badge.svg)](https://github.com/samdouble/repolint-action/actions/workflows/checks.yml)
[![Coverage Status](https://coveralls.io/repos/samdouble/repolint-action/badge.svg?branch=master&service=github)](https://coveralls.io/github/samdouble/repolint-action?branch=master)

[![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](https://github.com/features/actions)

# repolint-action

## Configuration

### Inputs

#### `github-token`

`github-token` is the GitHub token to use for API access. It is optional and must be a personal access token with the `repo` scope. If not provided, the action will use the default GitHub token.

### repolint.json

The action can be configured by creating a `repolint.json` file in the root of your repository.

```json
{
  "repos": ["repo1", "repo2", "repo3"]
}
```
