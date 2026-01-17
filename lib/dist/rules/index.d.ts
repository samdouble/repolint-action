import z from 'zod';
export * from './readme-exists';
export declare const ruleConfigSchema: z.ZodObject<{
    'file-exists': z.ZodOptional<z.ZodObject<{
        caseSensitive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        path: z.ZodString;
    }, z.core.$strip>>;
    'license/exists': z.ZodOptional<z.ZodObject<{
        caseSensitive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>;
    'readme/exists': z.ZodOptional<z.ZodObject<{
        caseSensitive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type RuleConfig = z.infer<typeof ruleConfigSchema>;
export type RuleName = keyof RuleConfig;
//# sourceMappingURL=index.d.ts.map