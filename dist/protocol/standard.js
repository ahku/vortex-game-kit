/**
 * How a game ended, the same for every game: the contract a game module follows for its final result. A story forks
 * on these without knowing which game it was.
 */
export const STANDARD_OUTCOMES = [
    { id: 'win', label: 'Win' },
    { id: 'lose', label: 'Lose' },
    { id: 'give_up', label: 'Give up' },
];
/**
 * "Message game" for any game: send it a message (a ping, a hello, something that happened) and carry on. The story does not wait and no
 * result comes back; the game decides what the signal means and ignores one it does not know. A game that lists its own
 * signals declares its own `signal` action instead (Downbeat does), and keeps this one's shape.
 */
export const SIGNAL_ACTION = {
    id: 'signal',
    label: 'Message game',
    help: 'Sends the game a message, such as a ping or a hello. The story carries on at once; the game decides what, if anything, to do with it.',
    params: [
        {
            key: 'signal',
            label: 'Message',
            type: 'string',
            required: true,
            slug: true,
            help: 'A short name for the message, in lowercase words joined by hyphens, such as introduce-enemy or hello. A game ignores a message it does not know.',
        },
    ],
    oneWay: true,
    outcomes: [{ id: 'sent', label: 'Sent' }],
    default: 'sent',
    card: 'Sends the game a message: {signal}',
};
/** Any game: the standard events every game can answer. It is the choice for a game the studio has no module for. */
export const STANDARD_GAME = {
    id: 'game',
    name: 'Any game',
    icon: 'i-lucide-gamepad-2',
    help: 'A game that answers win or lose. Works with any host that handles the event "game".',
    actionKey: 'action',
    actionWhenUnset: 'play',
    actions: [
        {
            id: 'play',
            label: 'Play the game',
            params: [
                {
                    key: 'id',
                    label: 'What to start',
                    type: 'string',
                    help: 'An id the game understands: a level, an encounter. Leave it empty for the default.',
                },
            ],
            outcomes: STANDARD_OUTCOMES,
            default: 'win',
            resultFlag: 'game_result',
        },
        SIGNAL_ACTION,
    ],
};
/** The final-result event added to a game that declares none of its own: it reports the standard outcomes. */
export const RESULT_ACTION = {
    id: 'result',
    label: 'Game result',
    help: 'How the game ended: win, lose or give up.',
    params: [],
    outcomes: STANDARD_OUTCOMES,
    default: 'win',
    resultFlag: 'game_result',
};
export const reportsStandard = (a) => STANDARD_OUTCOMES.every((o) => a.outcomes.some((x) => x.id === o.id));
/**
 * Every game must be able to report how it ended with the standard outcomes. A game that has an event for that
 * (Downbeat's finish) keeps it; one that has none gets a "Game result" event.
 */
export function withStandardEvents(game) {
    const missing = [
        ...(game.actions.some(reportsStandard) ? [] : [RESULT_ACTION]),
        ...(game.actions.some((a) => a.id === SIGNAL_ACTION.id) ? [] : [SIGNAL_ACTION]),
    ];
    const all = [...game.actions, ...missing];
    // The message event is the same on every game, so it always comes last.
    const ordered = [
        ...all.filter((a) => a.id !== SIGNAL_ACTION.id),
        ...all.filter((a) => a.id === SIGNAL_ACTION.id),
    ];
    if (missing.length === 0 && ordered.every((a, i) => a === game.actions[i]))
        return game;
    return { ...game, actionKey: game.actionKey ?? 'action', actions: ordered };
}
