import { z } from 'zod';

export const AlertLevelSchema = z.enum(['error', 'warning']);
