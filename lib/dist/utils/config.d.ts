import { z } from 'zod';
export declare const configSchema: z.ZodObject<{
    rules: z.ZodDefault<z.ZodOptional<z.ZodObject<{
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
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type Config = z.infer<typeof configSchema>;
export declare const getConfig: () => Config;
//# sourceMappingURL=config.d.ts.map