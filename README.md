# Kannada Phonetic Keyboard -- KAAGUNITHA

A web-based Kannada typing tool that allows users to type Kannada using
English phonetic input.

The application converts English letters into Kannada script in real
time enabling users to write Kannada easily using a standard keyboard.

This project provides both: - Virtual keyboard - Physical keyboard
phonetic typing

The transliteration engine applies Kannada phonetic rules automatically
including vowel matras implicit vowels consonant clusters and
anusvara handling.

You can use `Copy All` to copy all text from text area and paste to any word document / editor

------------------------------------------------------------------------

# Features

-   Phonetic Kannada typing using English keyboard
-   Virtual + physical keyboard support
-   Real-time transliteration
-   Intelligent vowel matra application
-   Implicit vowel (`a`) handling
-   Automatic anusvara rule
-   Fast trie-based transliteration engine
-   Browser-based interface

------------------------------------------------------------------------

# Technology Stack

  Component                Technology
  ------------------------ ---------------------------
  Frontend                 React
  Runtime                  Node.js
  Transliteration Engine   Custom phonetic parser (javascript)
  Data Structures          Trie-based token matching

------------------------------------------------------------------------

# System Requirements

Hardware: - Minimum 8 GB RAM

Operating Systems: - Windows - Linux

Software Dependencies: - Node.js - npm

Verify installation:

node -v npm -v

------------------------------------------------------------------------

# Installation

Clone the repository:

git clone `<repository-url>`{=html} cd `<project-folder>`{=html}

Install dependencies:

npm install

------------------------------------------------------------------------

# Running the Application

From the project root directory run:

npm start

The application will start and open in your browser.

------------------------------------------------------------------------

# How to Use

1.  Launch the application.
2.  Enable the checkbox: **Phonetic**
3.  Start typing Kannada using English phonetics.

The engine automatically converts the text into Kannada characters.

------------------------------------------------------------------------

# Transliteration Rules

The transliteration engine converts phonetic tokens into Kannada
characters using predefined mappings.

## Vowel Mapping

  English   Kannada
  --------- ---------
  a         ಅ
  A         ಆ
  i         ಇ
  ee        ಈ
  u         ಉ
  oo        ಊ
  e         ಎ
  E         ಏ
  ai        ಐ
  o         ಒ
  O         ಓ
  au        ಔ

## Consonant Mapping

  English   Kannada
  --------- ---------
  k         ಕ್
  kh        ಖ್
  g         ಗ್
  gh        ಘ್
  q         ಙ್

  ch        ಚ್
  chh       ಛ್
  j         ಜ್
  jh        ಝ್
  w         ಞ್

  t         ಟ್
  T         ಠ್
  d         ಡ್
  D         ಢ್
  N         ಣ್

  th        ತ್
  thh       ಥ್
  dh        ದ್
  dhh       ಧ್
  n         ನ್

  p         ಪ್
  ph        ಫ್
  b         ಬ್
  bh        ಭ್
  m         ಮ್

  y         ಯ್
  r         ರ್
  l         ಲ್
  v         ವ್
  sh        ಶ್
  ssh       ಷ್
  s         ಸ್
  h         ಹ್
  L         ಳ್
  ksh       ಕ್ಷ್
  jn        ಜ್ಞ್

for explicit anuswara / otthakshara use virtual key board

------------------------------------------------------------------------

# Demo

Example typing:

nanna hesaru ramesh

Output:

ನನ್ನ ಹೆಸರು ರಮೇಶ್


# Example Usage

## Basic Words

  English Input   Kannada Output
  --------------- ----------------
  namasthe         ನಮಸ್ತೆ
  guru             ಗುರು
  rama             ರಾಮ
  dEva             ದೇವ
  kannaDa          ಕನ್ನಡ

## Common Words

  English Input   Kannada
  --------------- ---------
  bengaLooru       ಬೆಂಗಳೂರು
  bhAratha         ಭಾರತ
  vidhyA           ವಿದ್ಯಾ
  shakthi          ಶಕ್ತಿ
  dhharma          ಧರ್ಮ
  sadhAnandha      ಸದಾನಂದ
  sshaNmukha       ಷಣ್ಮುಖ

## Complex Words

  English Input   Kannada
  --------------- ---------
  prArthhane       ಪ್ರಾರ್ಥನೆ
  jnAna            ಜ್ಞಾನ
  kshEtra          ಕ್ಷೇತ್ರ
  mahAtma          ಮಹಾತ್ಮ
  jarAsandha       ಜರಾಸಂಧ
  sachchidhAnandha ಸಚ್ಚಿದಾನಂದ
------------------------------------------------------------------------

## known issue

* when typing / correcting a word in the middle of sentence, sometimes the whole sentence may
  get jumbled up / duplicated. In such cases, please add two spaces before editing any word
  in the middle of phrase/ sentence

* if some thing needs to end in anuswara, use virtual keyboard to insert it

  example phrase:
  `ಪದ್ಯ೦ ವಧ್ಯಂ, ಗದ್ಯ೦ ಹೃದ್ಯಂ`

  we need to use virtual keyboard for ` ಂ` and `ೃ` 
------------------------------------------------------------------------

# Contributing

Contributions are welcome.

Possible improvements: 
- Additional phonetic patterns 
- Kannada grammar corrections 
- UI improvements 
- enhanced mobile support 
- Additional Indian languages 
- voice based phonetic typing
- hosting on web server / CDN

------------------------------------------------------------------------

# License

MIT License
