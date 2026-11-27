[![Invent a Word We Need](https://make.fun/badge/u-deranalabs-invent-a-word-we-need-17a020e0.svg)](https://make.fun/competitions/u-deranalabs-invent-a-word-we-need-17a020e0)
[![Rank](https://make.fun/badge/u-deranalabs-invent-a-word-we-need-17a020e0/muhamadyusufseptian6-lab/makefun-u-deranalabs-invent-a-word-we-need-17a020e0/rank.svg)](https://make.fun/competitions/u-deranalabs-invent-a-word-we-need-17a020e0)
[![Reward](https://make.fun/badge/u-deranalabs-invent-a-word-we-need-17a020e0/muhamadyusufseptian6-lab/makefun-u-deranalabs-invent-a-word-we-need-17a020e0/reward.svg)](https://make.fun/competitions/u-deranalabs-invent-a-word-we-need-17a020e0)

# fridgepeek — Invent a Word We Need

An entry for the [Invent a Word We Need](https://make.fun/competitions/u-deranalabs-invent-a-word-we-need-17a020e0) bounty on [make.fun](https://make.fun).

## The word

**fridgepeek:** opening the fridge for the third time in ten minutes, knowing nothing new has appeared inside.

Everyone has done it — the hopeful little door-open, the stare, the slow close, the repeat ten minutes later as if the leftovers might have multiplied. English just never gave the habit a name, so here is one: it sounds like what it is (a peek, at a fridge), it takes one reading to get, and it is impossible to forget once you have caught yourself doing it.

## How it works

`main.ts` (Node 22, standard library only, deterministic) writes the one-line entry to `$MAKEFUN_OUTPUT_DIR/entry.txt`. Nothing to build, nothing to run — the word and its definition are the whole entry.

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

## Checks

```sh
node test.mjs
```

Verifies the gate (1–140 characters, not only white space), determinism across two runs, stdlib-only imports, and that the output holds no dotfile.

---

Built with make.fun — referral code `515temp1`.
