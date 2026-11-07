import { z } from 'zod';
import { FlagValue } from './common';
/**
 * Conditions are JSON, never code strings. They are evaluated against a flag store
 * (and, for collections, a set of completed stories).
 */
export type Condition = {
    flag: string;
    is: FlagValue;
} | {
    flag: string;
    isNot: FlagValue;
} | {
    flag: string;
    gt: number;
} | {
    flag: string;
    gte: number;
} | {
    flag: string;
    lt: number;
} | {
    flag: string;
    lte: number;
} | {
    completed: string;
} | {
    and: Condition[];
} | {
    or: Condition[];
} | {
    not: Condition;
};
export declare const ConditionSchema: z.ZodType<Condition>;
/** Operation that changes a flag. */
export declare const SetOpSchema: z.ZodUnion<readonly [z.ZodObject<{
    flag: z.ZodString;
    to: z.ZodUnion<readonly [z.ZodBoolean, z.ZodNumber, z.ZodString]>;
}, z.core.$strict>, z.ZodObject<{
    flag: z.ZodString;
    add: z.ZodNumber;
}, z.core.$strict>]>;
export type SetOp = z.infer<typeof SetOpSchema>;
/** Every flag name a condition reads. */
export declare function conditionFlags(cond: Condition, out?: Set<string>): Set<string>;
/** True if the condition (or any nested one) uses `completed`. */
export declare function conditionUsesCompleted(cond: Condition): boolean;
