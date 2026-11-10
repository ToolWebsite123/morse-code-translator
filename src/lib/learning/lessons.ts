/**
 * Canonical 10-Lesson Beginner Morse Code Curriculum
 *
 * Adheres strictly to PRD Section 16.2 and Section 6.9.
 * Uses canonical International Morse Code (ITU-R M.1677-1) standard.
 */

import type { Lesson } from '@/types/learning';

export const LESSONS: readonly Lesson[] = [
  {
    id: 'lesson-01',
    slug: 'what-is-morse-code',
    order: 1,
    title: '1. What Morse Code Is & How It Works',
    subtitle: 'The origins of telecommunication and the International Morse standard',
    estimatedMinutes: 3,
    objective: 'Understand how text is converted into discrete sound or light signals.',
    category: 'fundamentals',
    sections: [
      {
        heading: 'Introduction to Morse Code',
        paragraphs: [
          'Morse code is a telecommunication method used to encode text characters as sequences of two distinct signal durations: dots (short signals) and dashes (long signals).',
          'Invented in the 1830s by Samuel Morse and Alfred Vail for the electric telegraph, it revolutionized global communication by allowing messages to travel across telegraph wires and radio waves.',
          'Today, the world relies on the International Morse Code standard (Recommendation ITU-R M.1677-1), which standardizes 26 Latin letters, 10 Arabic digits, and essential punctuation marks.',
        ],
      },
      {
        heading: 'Why Learn Morse Code Today?',
        paragraphs: [
          'Even in our digital age, Morse code remains vital for amateur radio operators (HAM radio), maritime and aviation emergency signaling, military survival, and assistive technology for people with motor disabilities.',
          'Because it requires minimal bandwidth and works in noisy electrical conditions where voice transmissions fail, Morse signals can often be heard when nothing else gets through.',
        ],
      },
    ],
    examples: [
      {
        text: 'SOS',
        morse: '... --- ...',
        explanation: 'The universal distress signal: 3 dots, 3 dashes, 3 dots. Chosen for its unmistakable rhythm.',
      },
      {
        text: 'HI',
        morse: '.... ..',
        explanation: 'Friendly greeting: 4 dots for H, followed by 2 dots for I.',
      },
    ],
    exercise: {
      question: 'What are the two basic signaling elements used in International Morse Code?',
      prompt: 'Select the correct element pair:',
      type: 'morse-to-text',
      options: ['Dots and Dashes', 'Tones and Pauses', 'Waves and Pulses', 'Bits and Bytes'],
      expectedAnswer: 'Dots and Dashes',
      hint: 'Think of short beats (.) and long beats (-).',
      explanation: 'Morse code is formed entirely from short elements called dots (or dits) and long elements called dashes (or dahs).',
    },
  },
  {
    id: 'lesson-02',
    slug: 'dots-dashes-and-timing',
    order: 2,
    title: '2. Dots, Dashes & Standard Timing',
    subtitle: 'Master the 5 mathematical timing rules that define Morse rhythm',
    estimatedMinutes: 4,
    objective: 'Learn the fundamental PARIS timing ratios: 1 dot, 3-dot dash, and spacing rules.',
    category: 'timing',
    sections: [
      {
        heading: 'The Rule of Proportions',
        paragraphs: [
          'Morse code is not just sound; it is a precise mathematical rhythm. The fundamental unit of measurement is the duration of one dot (often called a "dit").',
          'Every other element and pause in Morse transmission is an exact multiple of that single dot unit.',
        ],
      },
      {
        heading: 'The 5 International Timing Rules',
        paragraphs: [
          '1. One Dot Duration = 1 unit of time.',
          '2. One Dash Duration = exactly 3 units of time (equal to 3 dots).',
          '3. Intra-character Space = 1 unit pause between dots and dashes within the same letter.',
          '4. Inter-character Space = 3 unit pause between different letters within the same word.',
          '5. Word Space = 7 unit pause between distinct words, represented in our translator with a forward slash (/).',
        ],
      },
    ],
    examples: [
      {
        text: 'E',
        morse: '.',
        explanation: 'Single dot: 1 unit on, followed by inter-character space.',
      },
      {
        text: 'T',
        morse: '-',
        explanation: 'Single dash: 3 units on (the length of three dots).',
      },
    ],
    exercise: {
      question: 'How many dot units does a single dash (-) equal in International Morse Code?',
      prompt: 'Enter the number of dot units:',
      type: 'text-to-morse',
      options: ['1 unit', '2 units', '3 units', '5 units'],
      expectedAnswer: '3 units',
      hint: 'A dash is exactly three times as long as a dot.',
      explanation: 'According to ITU-R M.1677-1, the duration of a dash is equal to three dots.',
    },
  },
  {
    id: 'lesson-03',
    slug: 'short-simple-characters',
    order: 3,
    title: '3. The Single-Element Foundations (E & T) and Binary Tree',
    subtitle: 'Learn the most frequent letters in human language: E, T, I, M, S, O',
    estimatedMinutes: 4,
    objective: 'Recognize the 6 simplest letters formed by pure dots and pure dashes.',
    category: 'letters',
    sections: [
      {
        heading: 'Efficiency by Design',
        paragraphs: [
          'Samuel Morse designed the code so that the most frequent letters in the English language had the shortest codes. The letter E (the most common letter) is a single dot, while T is a single dash.',
          'By adding dots and dashes sequentially, you create a natural binary tree of sounds:',
          '• 1 element: E (.) and T (-)',
          '• 2 elements: I (..) and M (--)',
          '• 3 elements: S (...) and O (---)',
        ],
      },
    ],
    examples: [
      {
        text: 'E',
        morse: '.',
        explanation: 'The shortest sound in Morse code: a single dit.',
      },
      {
        text: 'T',
        morse: '-',
        explanation: 'A single dah: three times the duration of E.',
      },
      {
        text: 'SEE',
        morse: '... . .',
        explanation: 'S (...) + E (.) + E (.). Notice the clean rhythmic progression.',
      },
    ],
    exercise: {
      question: 'What letter does three consecutive dots (...) represent?',
      prompt: 'Identify the letter for Morse sequence: ...',
      type: 'morse-to-text',
      options: ['S', 'O', 'E', 'H'],
      expectedAnswer: 'S',
      hint: 'It is the first and last letter of the famous SOS distress signal.',
      explanation: 'Three dots (...) represent the letter S. Three dashes (---) represent O.',
    },
  },
  {
    id: 'lesson-04',
    slug: 'the-full-latin-alphabet',
    order: 4,
    title: '4. The Complete A–Z Alphabet',
    subtitle: 'Strategies for memorizing all 26 letters using auditory opposites and rhymes',
    estimatedMinutes: 5,
    objective: 'Recognize opposite character pairs (like A .- and N -.) across the alphabet.',
    category: 'letters',
    sections: [
      {
        heading: 'Memorizing by Mirror Pairs',
        paragraphs: [
          'Instead of memorizing from A to Z alphabetically, radio operators often learn mirror pairs that invert dots and dashes:',
          '• A (.-) is the exact opposite of N (-.)',
          '• D (-..) is the exact opposite of U (..-)',
          '• B (-...) is the exact opposite of V (...-)',
          '• G (--.) is the exact opposite of W (.--)',
          '• K (-.-) is symmetrical, while R (.-.) is its inverse.',
        ],
      },
    ],
    examples: [
      {
        text: 'A vs N',
        morse: '.- vs -.',
        explanation: 'A is dot-dash; N is dash-dot.',
      },
      {
        text: 'RADIO',
        morse: '.-. .- -.. .. ---',
        explanation: 'R (.-.) + A (.-) + D (-..) + I (..) + O (---).',
      },
    ],
    exercise: {
      question: 'What is the Morse code sequence for the letter A?',
      prompt: 'Select the code for A:',
      type: 'text-to-morse',
      options: ['.-', '-.', '..', '--'],
      expectedAnswer: '.-',
      hint: 'Short followed by long (dit-dah).',
      explanation: 'The letter A is represented by dot-dash (.-). Its reverse (-.) is N.',
    },
  },
  {
    id: 'lesson-05',
    slug: 'numbers-zero-through-nine',
    order: 5,
    title: '5. Numbers (0 to 9) and the 5-Element Rule',
    subtitle: 'Understanding the elegant 5-element sliding window of Arabic digits',
    estimatedMinutes: 4,
    objective: 'Master all 10 digits using the predictable 5-element pattern.',
    category: 'numbers',
    sections: [
      {
        heading: 'The 5-Element Symmetry of Numbers',
        paragraphs: [
          'Every number from 0 to 9 in International Morse Code is exactly 5 elements long. This makes numbers very easy to distinguish from letters (which are 1 to 4 elements).',
          'The sequence follows a systematic progression:',
          '• 1: .---- (1 dot, 4 dashes)',
          '• 2: ..--- (2 dots, 3 dashes)',
          '• 3: ...-- (3 dots, 2 dashes)',
          '• 4: ....- (4 dots, 1 dash)',
          '• 5: ..... (5 dots)',
          'Then dashes start taking over from left to right:',
          '• 6: -.... (1 dash, 4 dots)',
          '• 7: --... (2 dashes, 3 dots)',
          '• 8: ---.. (3 dashes, 2 dots)',
          '• 9: ----. (4 dashes, 1 dot)',
          '• 0: ----- (5 dashes)',
        ],
      },
    ],
    examples: [
      {
        text: '7',
        morse: '--...',
        explanation: 'Two dashes followed by three dots.',
      },
      {
        text: '2026',
        morse: '..--- ----- ..--- -....',
        explanation: 'Each digit takes exactly 5 rhythmic pulses.',
      },
    ],
    exercise: {
      question: 'What Morse code sequence represents the number 0?',
      prompt: 'Select the code for 0:',
      type: 'text-to-morse',
      options: ['-----', '.....', '.----', '-....'],
      expectedAnswer: '-----',
      hint: 'Zero consists of five consecutive long dashes.',
      explanation: '0 is five dashes (-----), while 5 is five dots (.....).',
    },
  },
  {
    id: 'lesson-06',
    slug: 'essential-punctuation-marks',
    order: 6,
    title: '6. Official Punctuation & Separators',
    subtitle: 'Full stops, commas, question marks, and the 18 ITU-R approved symbols',
    estimatedMinutes: 4,
    objective: 'Learn the most common punctuation marks used in telegrams and radio traffic.',
    category: 'punctuation',
    sections: [
      {
        heading: 'Official Punctuation in International Morse',
        paragraphs: [
          'Unlike letters and numbers, punctuation symbols are longer—typically 5 to 6 elements. This prevents them from being confused with short words.',
          'The three most frequent punctuation symbols are:',
          '• Period / Full Stop (.): .-.-.- (dot-dash-dot-dash-dot-dash)',
          '• Comma (,): --..-- (dash-dash-dot-dot-dash-dash)',
          '• Question Mark (?): ..--.. (dot-dot-dash-dash-dot-dot)',
        ],
      },
    ],
    examples: [
      {
        text: 'HELLO, WORLD.',
        morse: '.... . .-.. .-.. --- --..-- / .-- --- .-. .-.. -.. .-.-.-',
        explanation: 'Shows how comma (--..--), period (.-.-.-), and word separator (/) work together.',
      },
    ],
    exercise: {
      question: 'What Morse code represents the question mark (?)?',
      prompt: 'Select the code for ?:',
      type: 'text-to-morse',
      options: ['..--..', '.-.-.-', '--..--', '-..-.'],
      expectedAnswer: '..--..',
      hint: 'Two dots, two dashes, two dots.',
      explanation: 'Question mark is ..--.. (two dots, two dashes, two dots).',
    },
  },
  {
    id: 'lesson-07',
    slug: 'word-boundaries-and-slash-separator',
    order: 7,
    title: '7. Word Boundaries & The Slash Separator Convention',
    subtitle: 'Why forward slash (/) is used between words, and how literal slashes are handled',
    estimatedMinutes: 3,
    objective: 'Master the difference between word separation (7 units) and literal slash (-..-.).',
    category: 'timing',
    sections: [
      {
        heading: 'Word Spacing in Text vs Audio',
        paragraphs: [
          'When listening to audio Morse code, a space between words is represented by a 7-unit silence (pause).',
          'However, when writing Morse code in text, a single space indicates letter separation (3 units). To clearly show where words start and end without ambiguous multi-space gaps, the universal convention is to use a forward slash (/) surrounded by spaces.',
        ],
      },
      {
        heading: 'What About a Literal Slash in Text?',
        paragraphs: [
          'If your text contains a real slash character (such as in "A/B" or a URL), our translator encodes it using the official Morse sequence for slash: -..-.',
          'This guarantees zero ambiguity between word breaks and literal punctuation.',
        ],
      },
    ],
    examples: [
      {
        text: 'CAT DOG',
        morse: '-.-. .- - / -.. --- --.',
        explanation: 'The slash / separates the word CAT from DOG.',
      },
    ],
    exercise: {
      question: 'In written Morse code, what symbol is placed between words to indicate a 7-unit word pause?',
      prompt: 'Enter the word separator symbol:',
      type: 'morse-to-text',
      options: ['/', '|', '-', '#'],
      expectedAnswer: '/',
      hint: 'It is a forward slash surrounded by spaces.',
      explanation: 'In modern written Morse translators, forward slash (/) represents the 7-unit boundary between words.',
    },
  },
  {
    id: 'lesson-08',
    slug: 'reading-morse-groups-and-rhythm',
    order: 8,
    title: '8. Reading Groups & Overcoming Group Confusion',
    subtitle: 'Decoding continuous sequences and avoiding common spacing traps',
    estimatedMinutes: 4,
    objective: 'Decode multi-letter words by focusing on letter spacing.',
    category: 'fundamentals',
    sections: [
      {
        heading: 'The Importance of Spacing',
        paragraphs: [
          'In Morse code, timing is everything. Without proper spacing, completely different messages can have the exact same dots and dashes!',
          'For example: . - can be E T (if separated by a 3-unit space) or A (if combined with a 1-unit intra-letter space).',
          'Always look for the single space between letter groups to know when one character ends and the next begins.',
        ],
      },
    ],
    examples: [
      {
        text: 'ET vs A',
        morse: '. - vs .-',
        explanation: 'With a space (. -) it is E and T. Without a space (.-) it is A.',
      },
      {
        text: 'ME vs G',
        morse: '-- . vs --.',
        explanation: 'With a space (-- .) it is M and E. Without a space (--.) it is G.',
      },
    ],
    exercise: {
      question: 'What word is decoded from the Morse sequence: -.-. .- - ?',
      prompt: 'Decode the three letter groups:',
      type: 'morse-to-text',
      options: ['CAT', 'DOG', 'CAR', 'BAT'],
      expectedAnswer: 'CAT',
      hint: '-.-. is C, .- is A, - is T.',
      explanation: '-.-. (C) + .- (A) + - (T) decodes to CAT.',
    },
  },
  {
    id: 'lesson-09',
    slug: 'listening-at-different-speeds',
    order: 9,
    title: '9. Auditory Recognition & Speed (WPM)',
    subtitle: 'Training your ear to recognize the music of Morse rather than counting dots',
    estimatedMinutes: 5,
    objective: 'Understand Words Per Minute (WPM) and the PARIS 50-unit timing standard.',
    category: 'timing',
    sections: [
      {
        heading: 'Stop Counting Dots!',
        paragraphs: [
          'Beginners often try to visually or mentally count: "one dot, two dots, three dots...". At speeds above 10 WPM, counting becomes impossible.',
          'Instead, successful operators listen to the rhythm and melody of the character. A (.-) sounds like "di-DAH". B (-...) sounds like "DAH-di-di-dit". S (...) sounds like a quick rattle.',
        ],
      },
      {
        heading: 'The PARIS Standard for WPM',
        paragraphs: [
          'Morse code speed is measured in Words Per Minute (WPM) based on the standard word "PARIS".',
          'Including inter-character and word spaces, the word PARIS takes exactly 50 dot units. Therefore, at 15 WPM, one dot is 1200 / 15 = 80 milliseconds.',
        ],
      },
    ],
    examples: [
      {
        text: 'PARIS',
        morse: '.--. .- .-. .. ...',
        explanation: 'The international calibration word: exactly 50 units long.',
      },
    ],
    exercise: {
      question: 'What standard 5-letter word is used worldwide to calibrate Morse speed (WPM)?',
      prompt: 'Select the standard calibration word:',
      type: 'text-to-morse',
      options: ['PARIS', 'MORSE', 'RADIO', 'HELLO'],
      expectedAnswer: 'PARIS',
      hint: 'The capital of France.',
      explanation: 'PARIS consists of exactly 50 time units, making it the universal standard for calculating WPM.',
    },
  },
  {
    id: 'lesson-10',
    slug: 'comprehensive-review-and-next-steps',
    order: 10,
    title: '10. Comprehensive Review & Transition to Drills',
    subtitle: 'Putting it all together: decoding full messages and preparing for quizzes',
    estimatedMinutes: 4,
    objective: 'Demonstrate readiness for timed practice drills and the comprehensive quiz.',
    category: 'fundamentals',
    sections: [
      {
        heading: 'Congratulations on Completing the Fundamentals!',
        paragraphs: [
          'You have now covered the complete International Morse Code system: letters, numbers, punctuation, timing rules, and listening strategies.',
          'The best way to lock these patterns into muscle memory is through active recall. Head over to our Practice Drills to reinforce individual characters, and test your overall mastery in the Quiz Mode.',
        ],
      },
    ],
    examples: [
      {
        text: 'WELL DONE',
        morse: '.-- . .-.. .-.. / -.. --- -. .',
        explanation: 'A complete two-word message showing all core concepts.',
      },
    ],
    exercise: {
      question: 'What does the message .-- . .-.. .-.. decode to?',
      prompt: 'Decode the four-letter word:',
      type: 'morse-to-text',
      options: ['WELL', 'WILL', 'WALL', 'WIND'],
      expectedAnswer: 'WELL',
      hint: '.-- is W, . is E, .-.. is L, .-.. is L.',
      explanation: '.-- (W) + . (E) + .-.. (L) + .-.. (L) = WELL.',
    },
  },
];

export function getAllLessons(): readonly Lesson[] {
  return LESSONS;
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getAdjacentLessons(slug: string): { prev?: Lesson; next?: Lesson } {
  const index = LESSONS.findIndex((l) => l.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? LESSONS[index - 1] : undefined,
    next: index < LESSONS.length - 1 ? LESSONS[index + 1] : undefined,
  };
}

