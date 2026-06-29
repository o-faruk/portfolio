export const PROJECTS = [
  {
    num: '01',
    name: 'JARVIS',
    tagline: 'voice-driven personal assistant',
    capLabel: 'jarvis_capture',
    desc: 'A voice-driven personal assistant that automates my daily workflow and answers in real time.',
    long: `Premise: most assistants are either dumb timers or cloud black boxes.

JARVIS is my attempt at a genuinely useful one — speech in, action out, with an LLM doing the reasoning in the middle. Wake word, transcription, intent, response, all stitched into a loop that actually does things instead of just talking.`,
    tags: ['Python', 'Whisper', 'LLM', 'TTS'],
    live: '#',
    src: '#',
  },
  {
    num: '02',
    name: 'Recall',
    tagline: 'spaced-repetition memory tool',
    capLabel: 'recall_capture',
    desc: 'A spaced-repetition memory tool that turns scattered notes into smart, resurfacing flashcards.',
    long: `Problem: notes go in and never come back out.

Recall ingests your notes and turns them into a spaced-repetition deck that resurfaces the right card at the right time — so the things you learn actually stick instead of decaying.`,
    tags: ['React', 'Node', 'Postgres'],
    live: '#',
    src: '#',
  },
]
