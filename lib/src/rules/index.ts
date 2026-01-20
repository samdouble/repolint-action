import z from 'zod';
import { FileExistsSchema } from './file-exists';
import { LicenseExistsSchema } from './license-exists';
import { ReadmeExistsSchema } from './readme-exists';

export * from './readme-exists';

export const ruleConfigSchema = z.object({
  'file-exists': FileExistsSchema.optional(),
  'license/exists': LicenseExistsSchema.optional(),
  'readme/exists': ReadmeExistsSchema.optional(),
});

export type RuleConfig = z.infer<typeof ruleConfigSchema>;
export type RuleName = keyof RuleConfig;
