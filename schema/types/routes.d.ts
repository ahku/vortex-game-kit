import type { Condition } from './conditions';
import type { ForkRoute, ForkStep, Step } from './steps';
/** The fork a route belongs to, and the route. */
export interface RouteRef {
    fork: ForkStep;
    route: ForkRoute;
}
/** Every route of the steps' forks by route id. A route id used twice keeps its first fork. */
export declare function routeIndex(steps: readonly Step[]): Map<string, RouteRef>;
/**
 * The routes a step is inside, outermost first: its own route, then the route of that route's fork, and so on up.
 * A route that does not exist, or one that loops back on itself, ends the chain.
 */
export declare function routeChain(step: Step, index: ReadonlyMap<string, RouteRef>): RouteRef[];
/** All of a step's conditions, together: the routes it is in (outermost first), the forks' own, and its own. */
export declare function effectiveWhen(step: Step, index: ReadonlyMap<string, RouteRef>): Condition | undefined;
/**
 * The steps as the engine plays them: a step in a route gets the routes' conditions as its `when`, and a fork step
 * becomes a step that does nothing (it keeps its id, so "play from here" on it still works). Steps with no route
 * and no fork come back as they are.
 */
export declare function applyRoutes(steps: readonly Step[]): Step[];
/** The index of the last step inside a fork (nested ones included), or the fork's own index when it has none. */
export declare function forkBlockEnd(steps: readonly Step[], forkIndex: number): number;
/**
 * Where a Leave step goes: the id of the step that follows the fork it leaves, `scene` for the end of the scene (also
 * when nothing follows the fork), or undefined when it has nowhere to go (leaving a fork it is not in).
 */
export declare function leaveTarget(steps: readonly Step[], at: number): string | 'scene' | undefined;
