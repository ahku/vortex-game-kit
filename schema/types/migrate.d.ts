import { type Story } from './story';
type Migration = (doc: Record<string, unknown>) => Record<string, unknown>;
/**
 * Migrations from version N to N+1, keyed by N. Add one whenever SCHEMA_VERSION is bumped:
 * a story saved by an older studio must still load.
 */
export declare const STORY_MIGRATIONS: Record<number, Migration>;
export declare class SchemaVersionError extends Error {
    constructor(message: string);
}
/** Bring any supported story document up to the current version, without validating it. */
export declare function migrateStoryDocument(raw: unknown): unknown;
/** Migrate, then validate. Throws SchemaVersionError or a Zod error. */
export declare function parseStory(raw: unknown): Story;
export {};
