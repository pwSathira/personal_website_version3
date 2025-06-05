---
title: "Anki Deck Extractor Release"
date: "2025-06-02"
description: "Latest release of the extension and desktop application that can export audio from any Anki Deck."
pinned: false
---

## From Kana Chaos to Code: My Accidental Anki Audio Extractor

So, you know how it is when you're job hunting. You're polishing the resume, practicing LeetCode until your eyes bleed, and trying to find *any* excuse to build something cool. For me, that "something cool" started with a completely unrelated hobby: learning Japanese.

Yeah, I figured after consuming mountains of anime and J-RPGs, it was time to actually understand what was being said without subtitles. Now, if you've ever dipped your toes into Japanese, you know about the three character systems: Hiragana (ひらがな), Katakana (カタカナ), and the big boss, Kanji (漢字).

The "Kana" (Hiragana and Katakana) are phonetic, kind of like our alphabet. They make similar sounds, sometimes even look alike, but Hiragana is for native words and general use, while Katakana is mostly for loanwords (think "computer" -> コンピューター - konpyūtā).

My grand idea for learning Kana faster? Treat 'em like uppercase and lowercase letters. We learn 'a' and 'A' together, so why not learn あ (a) and ア (A) together? This led to the birth of "Mushoku," a website I'm tinkering with to teach Kana this way.

But to make Mushoku truly useful, I needed audio clips of native speakers pronouncing each character. "Easy," I thought, "I'll just grab them from some Anki decks!" (Anki, for the uninitiated, is a super popular flashcard app, especially for language learning).

Famous last words.

Turns out, there wasn't a straightforward extension to just rip all the audio out of an Anki `.apkg` file. Seriously? In this day and age? Challenge accepted.

**Phase 1: The Python Proof-of-Concept - "Does it even work?"**

I went for the "build fast, break things" approach. A quick and dirty Python script was cobbled together. The goal: prove I could systematically extract audio. And… success! It wasn't pretty, but it spat out audio files. We had a pulse!

**Phase 2: The Desktop Dream - "Let's make it shiny!"**

With the concept proven, my brain went into "over-engineer it" mode. "I'll build a React Native frontend with a C# backend!" I proclaimed to an empty room. Thankfully, sanity prevailed before I went down *that* rabbit hole.

The compromise? An Electron app with an Express.js server. Simple drag-and-drop: you give it the `.apkg` package, tell it where to save, and *boom* – audio files galore. It was functional, it looked decent (for a dev tool), and I was pretty chuffed.

**The Uh-Oh Moment: The Trust Factor**

Then came the reality check. Who in their right mind would download a random `.exe` or `.dmg` from some dude on the internet, especially without proper code signing certificates for macOS and Windows? My beautiful desktop app would look sketchier than a three-dollar bill. The barrier to entry (and trust) was just too high.

**Phase 3: The Pivot - "If you can't beat 'em, join 'em (on the web)."**

If I wanted actual users, I needed to meet them where they were and where they felt safe. The answer? An Anki web extension. It made so much sense. Users are already in the Anki ecosystem; an extension feels like a natural add-on, not a potential virus.

So, I went back to my trusty Python script's logic and started rebuilding it as an Anki web extension. This felt like the right path – more accessible, more trustworthy.

**What I Learned (Besides a Bit More Japanese)**

This whole detour was a fantastic lesson in real-world software development:

1.  **PoCs are Gold:** That initial Python script saved me a ton of time by validating the core idea before I invested heavily.
2.  **"Simple" Isn't Always "Practical":** The desktop app was technically simpler for *me* to build initially, but it was impractical for users.
3.  **User Trust is Everything:** That certificate issue wasn't just a technical hurdle; it was a fundamental user experience and security concern. If they don't trust it, they won't use it, no matter how cool it is.
4.  **Pivoting is Progress:** Realizing the desktop app was a dead-end for user adoption and switching to a web extension wasn't a failure; it was adapting to reality.
5.  **Sometimes the Side Quest is the Real Quest:** I just wanted audio for Mushoku, and I ended up building a whole new tool.

So, the Anki Deck Audio Extractor is now out there as a web extension. If you're learning a language and need to snag audio from your decks, hopefully, this makes your life a little easier.

It's a solid reminder that building software isn't just about writing code; it's about understanding users, their environments, and what makes them click "install" (or, in this case, "add to Anki"). And hey, at least now *I* can get those audio files for Mushoku!

*   **Get the Extension on AnkiWeb:** [https://ankiweb.net/shared/info/2104311619](https://ankiweb.net/shared/info/2104311619)
*   **Check out the "Definitely Not a Virus" Desktop Version on GitHub:** [https://github.com/pwsathira/anki-audio-extractor/](https://github.com/pwsathira/anki-audio-extractor/)