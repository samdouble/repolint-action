import type { getOctokit } from '@actions/github';
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

export type Octokit = ReturnType<typeof getOctokit>;
export type Repository = RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data'][number];
export type RepoContent = RestEndpointMethodTypes['repos']['getContent']['response']['data'];

export interface FileEntry {
  path: string;
  name: string;
  type: 'file' | 'dir';
}

export class RuleContext {
  private contentCache: Map<string, RepoContent> = new Map();
  private allFilesCache: FileEntry[] | null = null;

  constructor(
    public readonly octokit: Octokit,
    public readonly repository: Repository,
  ) {}

  async getContent(path: string = ''): Promise<RepoContent> {
    const cacheKey = `${this.repository.full_name}:${path}`;

    if (this.contentCache.has(cacheKey)) {
      return this.contentCache.get(cacheKey)!;
    }

    const { data: contents } = await this.octokit.rest.repos.getContent({
      owner: this.repository.owner.login,
      repo: this.repository.name,
      path,
    });

    this.contentCache.set(cacheKey, contents);
    return contents;
  }

  async getAllFiles(): Promise<FileEntry[]> {
    if (this.allFilesCache !== null) {
      return this.allFilesCache;
    }

    const files: FileEntry[] = [];
    const dirsToProcess: string[] = [''];

    while (dirsToProcess.length > 0) {
      const dir = dirsToProcess.pop()!;
      try {
        const contents = await this.getContent(dir);
        if (Array.isArray(contents)) {
          for (const item of contents) {
            const itemPath = dir ? `${dir}/${item.name}` : item.name;
            if (item.type === 'file') {
              files.push({ path: itemPath, name: item.name, type: 'file' });
            } else if (item.type === 'dir') {
              files.push({ path: itemPath, name: item.name, type: 'dir' });
              dirsToProcess.push(itemPath);
            }
          }
        }
      } catch {
        // Directory doesn't exist or inaccessible
      }
    }

    this.allFilesCache = files;
    return files;
  }

  clearCache(): void {
    this.contentCache.clear();
    this.allFilesCache = null;
  }
}
