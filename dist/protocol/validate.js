import { STANDARD_OUTCOMES } from './standard.js';
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const isSlug = (value) => typeof value === 'string' && SLUG.test(value);
/**
 * What is wrong with a game's declaration, as plain sentences; an empty list means it is fine. Checks the rules the
 * standard states: ids are slugs and unique, every default is one of the action's outcomes, the game can report the
 * standard outcomes, and it can take a message.
 */
export function checkDeclaration(game) {
    const issues = [];
    const say = (text) => issues.push(`${game.id}: ${text}`);
    if (!isSlug(game.id))
        say(`the game id "${game.id}" is not a slug`);
    if (game.actions.length === 0)
        say('it declares no actions');
    if (game.actions.length > 1 && !game.actionKey)
        say('it has several actions but no actionKey to tell them apart');
    const seen = new Set();
    for (const action of game.actions) {
        const at = `action "${action.id}"`;
        if (!isSlug(action.id))
            say(`${at} is not a slug`);
        if (seen.has(action.id))
            say(`${at} is declared twice`);
        seen.add(action.id);
        const outcomes = action.outcomes.map((o) => o.id);
        if (outcomes.length === 0)
            say(`${at} has no outcomes`);
        if (!outcomes.includes(action.default))
            say(`${at} has the default "${action.default}", which is not one of its outcomes`);
        if (action.oneWay && outcomes.length > 1)
            say(`${at} is one-way but has several outcomes`);
        if (action.after && !game.actions.some((a) => a.id === action.after))
            say(`${at} needs "${action.after}", which the game does not declare`);
        for (const param of action.params)
            for (const option of param.options ?? [])
                for (const o of option.outcomes ?? [])
                    if (!outcomes.includes(o))
                        say(`${at}: option "${option.value}" reports "${o}", which the action does not`);
    }
    if (!game.actions.some((a) => STANDARD_OUTCOMES.every((s) => a.outcomes.some((o) => o.id === s.id))))
        say('no action reports the standard outcomes (win, lose, give_up)');
    if (!game.actions.some((a) => a.id === 'signal' && a.oneWay))
        say('it declares no one-way "signal" action');
    return issues;
}
/** Reads a `game:signal` payload. `error` is the code a game answers with when it is refused. */
export function readSignalCommand(payload) {
    const p = (payload ?? {});
    if (typeof p.requestId !== 'string' || p.requestId === '')
        return { ok: false, error: 'bad-request' };
    return {
        ok: true,
        command: {
            requestId: p.requestId,
            sessionId: typeof p.sessionId === 'string' ? p.sessionId : '',
            signal: typeof p.signal === 'string' ? p.signal : '',
            values: p.values && typeof p.values === 'object' ? p.values : undefined,
        },
    };
}
