# Audio: what we learned making Downbeat sound right

Browsers are strict about sound. These are the rules and fixes that came out of building Downbeat (the first game to play
Studio stories). Read this before you give your game and the story one sound system. The code to look at is
`src/audio/hostAudio.ts` and `src/story/elementSession.ts` in the Downbeat repository.

## The rules

1. **One owner of audio: the game.** Pass your audio manager as `player.audio` and your mute setting as `player.mute`
   (START-HERE, level 3). Story and game then share one music channel and one voice channel. A game that makes its own
   `Audio` elements next to the story's will play two songs at once.
2. **Your manager must do what `PlayerAudio` says** (`vortex-game-kit/protocol`): `setMusic`, `fadeMusicTo`, `playSfx`,
   `playVoice`, `stopVoice`, `stopSounds`, `stopAll`, `setMuted`, `suspend`, `resume`. Leave out `suspend`/`resume` and
   the story keeps playing in a background tab. The package has no ready-made manager yet; Downbeat's is
   `vendor/grs/presentation/audio.ts` and can be copied.
3. **Nothing plays before a click or key press.** Show a start button (or any menu click) before the first story. Never
   rely on a story starting by itself on page load.
4. **Silence the page when it is out of sight** (next section). This is the most common thing people notice.
5. **Short effects use Web Audio, music uses media elements.** Hits and clicks need low delay; a new `Audio` element per
   hit is slow on phones.
6. **Mute is a setting that outlives the page and is shared** by menu, story and battle. Keep one store, subscribe
   everyone to it, and apply it to every element and every gain node, including ones created later.

## Stop sound when the tab is hidden

Music, voices and effects must pause when the player switches tab, locks the phone or goes to the home screen, and come
back when they return. Three events cover it:

```ts
const sync = () => (document.hidden ? audio.suspend() : audio.resume());
document.addEventListener('visibilitychange', sync);
window.addEventListener('pagehide', () => audio.suspend()); // iOS Safari leaving the page
window.addEventListener('pageshow', sync);                  // coming back from the back/forward cache
```

Remove the listeners when the story ends. What `suspend`/`resume` do in Downbeat's host audio:

- **suspend:** pause the manager (music, voice, story effects), pause the battle's effects, suspend any `AudioContext`
  and remember that the page was away.
- **resume:** resume the manager, then, because iOS can leave the old music element unable to play again, **start the same
  track again from the same position** (stop it with no fade, `setMusic(key, { offsetMs, fadeMs: 400 })`), then resume the
  effects.
- **If the browser refuses to restart** (it does this on phones coming back from the home screen): try again after
  0.5 s, and also on the player's next touch or key press. A phone call or the lock screen can pause media without any
  event the page sees, so listen for `pointerdown`, `touchend` and `keydown` and restart paused music then.

## Make it play well

- **Unlock your songs in advance.** Loading the bytes does not give permission to play. If a song must start later by
  itself (a victory theme at the killing blow), create its `Audio` element early, play it silently
  (`volume = 0`) inside a normal click, pause it, and use *that same element* when the song is needed. Otherwise the
  victory theme is blocked until the next click, and that click stops it. Keep a spare ready for the next time.
- **Effects:** decode clips once into `AudioBuffer`s (an `OfflineAudioContext` can decode before the first click) and play
  each hit through a buffer source. Create the real `AudioContext` on the first gesture, with `latencyHint: 'interactive'`.
  Chrome warns about one made earlier. Play nothing while its state is not `running`; queue the cue and flush it on
  `statechange`.
- **iOS ringer switch:** set `navigator.audioSession.type = 'playback'` (where it exists) so effects are not treated as
  ambient sound and silenced by the ringer switch. Without it, story media can be heard while the game's effects are silent.
- **Pausing the game's own effects without pausing the story's music:** give the port `sfx.pause()`/`sfx.resume()`
  (suspend your effects context, pause effect elements and remember which ones you paused). Use them for your pause menu.
- **Songs that belong to the game** (victory, defeat) go through your port's `music.play(key)`. A key with no file does
  nothing, so the story's own music keeps playing.

## Story and game taking turns

- **A game song cuts the story's voice.** When your game starts its own music over the story (a victory theme) call
  `audio.stopVoice()` first, or the character talks over it. Do the same when a battle takes over the screen.
- **The story must not bring its music back too early.** After a win, the victory song should play to the end before the
  story's music returns; the story step that follows must not switch back to the battle theme meanwhile. (Downbeat fixed
  exactly this in 0.0.27.)
- **A step that only changes the music** (a fork, say) must still change it while the game has the screen. The player
  tells you through the shared manager, so use the same manager.
- **Sound that should not play at a given moment** (a stun sound when the blow also wins the fight and no message is
  shown) is a game rule: decide it where the sound is triggered, not in the audio layer.

## Check it by hand

1. Start a story with music and a voice line. Switch tab: everything stops. Come back: the music continues from where it
   was.
2. Do the same on an iPhone: lock the phone, unlock, and touch the screen once.
3. Mute during a story, start a battle, unmute: both follow.
4. Win a battle: the victory song starts, no voice talks over it, and it plays to the end before the story's music
   returns.
5. Reload the page and start a story without clicking anything first: nothing may play until the first click.
