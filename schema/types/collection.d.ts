import { z } from 'zod';
/**
 * A collection is the chapter map: stories plus the rules for unlocking them. It is a separate,
 * optional document. Stories never depend on it; games can ignore it and do their own progression.
 */
export declare const CollectionNodeSchema: z.ZodObject<{
    id: z.ZodString;
    story: z.ZodString;
    kind: z.ZodEnum<{
        main: "main";
        side: "side";
    }>;
    title: z.ZodOptional<z.ZodString>;
    unlock: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    position: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type CollectionNode = z.infer<typeof CollectionNodeSchema>;
export declare const CollectionSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    id: z.ZodString;
    meta: z.ZodObject<{
        title: z.ZodString;
    }, z.core.$strict>;
    nodes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        story: z.ZodString;
        kind: z.ZodEnum<{
            main: "main";
            side: "side";
        }>;
        title: z.ZodOptional<z.ZodString>;
        unlock: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    edges: z.ZodDefault<z.ZodArray<z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
    }, z.core.$strict>>>;
}, z.core.$strict>;
export type Collection = z.infer<typeof CollectionSchema>;
