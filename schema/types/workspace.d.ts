import { z } from 'zod';
/** The workspace's shared flags: the interface between stories and between a story and a game. */
export declare const FlagRegistrySchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    flags: z.ZodRecord<z.ZodString, z.ZodObject<{
        type: z.ZodEnum<{
            string: "string";
            number: "number";
            boolean: "boolean";
        }>;
        default: z.ZodUnion<readonly [z.ZodBoolean, z.ZodNumber, z.ZodString]>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type FlagRegistry = z.infer<typeof FlagRegistrySchema>;
/** Theme data: dialog box, fonts and timing defaults. Editing UI comes later. */
export declare const ThemeSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    fonts: z.ZodObject<{
        body: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    textSpeedCps: z.ZodDefault<z.ZodNumber>;
    fadeMs: z.ZodDefault<z.ZodNumber>;
    imageFadeInMs: z.ZodOptional<z.ZodNumber>;
    imageFadeOutMs: z.ZodOptional<z.ZodNumber>;
    imageEnter: z.ZodOptional<z.ZodEnum<{
        left: "left";
        right: "right";
        fade: "fade";
        top: "top";
        bottom: "bottom";
    }>>;
    imageExit: z.ZodOptional<z.ZodEnum<{
        left: "left";
        right: "right";
        fade: "fade";
        top: "top";
        bottom: "bottom";
    }>>;
    dialogBox: z.ZodObject<{
        anchor: z.ZodDefault<z.ZodEnum<{
            top: "top";
            bottom: "bottom";
        }>>;
        opacity: z.ZodDefault<z.ZodNumber>;
        nameplate: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strict>;
}, z.core.$strict>;
export type Theme = z.infer<typeof ThemeSchema>;
