import { consonantMap, matraMap, independentVowels } from "./transliterationMap";
import { logUnicode } from "../../../hooks/helpers"


function longestMatch(trie, input, start) {
  let node = trie;
  let match = null;
  let i = start;

  while (i < input.length && node[input[i]]) {
    node = node[input[i]];
    if (node.$) match = node.$;
    i++;
  }

  return match;
}

/* ---------- auto apply matra ---------- */
function applyMatra(consonant, vowel) {
  const matra = matraMap[vowel];
  if (matra === "") return consonant.slice(0, -1);
  return consonant.slice(0, -1) + matra;
}

/* ---------- auto apply anuswara ---------- */
function applyAnusvaraRule(prev, next) {
  // logUnicode(prev)
  // logUnicode(next)
  if (!prev) return null;

  if (prev === " ") return null;

  if (!next) return null;

  if (next === "y") return null;

  if (next.startsWith("n") || next.startsWith("m"))
    return null;

  return "ಂ";
}

/* ---------- trie structure and token for parsing input ---------- */
function buildTrie(tokens) {
  const root = {};
  for (const token of tokens) {
    let node = root;
    for (const c of token) {
      if (!node[c]) node[c] = {};
      node = node[c];
    }
    node.$ = token;
  }
  return root;
}

const consonantTrie = buildTrie(
  Object.keys(consonantMap).sort((a, b) => b.length - a.length)
);
const vowelTrie = buildTrie(
  Object.keys(matraMap).sort((a, b) => b.length - a.length)
);

/* ---------- main logic for transliteration ---------- */
export function transliterate(input) {

  let output = "";
  let i = 0;
  let prevConsonant = false;

  while (i < input.length) {
    if (input[i] === "n") {
      const nextCons = longestMatch(consonantTrie, input, i + 1);
      if (nextCons) {
        const anuswara = applyAnusvaraRule(output, nextCons);
        if (anuswara) {
          output += anuswara;
          i++;
          continue;
        }
      }
    }

    const cons = longestMatch(consonantTrie, input, i);
    if (cons) {
      const consChar = consonantMap[cons];
      const vowel = longestMatch(vowelTrie, input, i + cons.length);
      if (vowel) {
        output += applyMatra(consChar, vowel);
        i += cons.length + vowel.length;
        prevConsonant = false;
        continue;
      }

      /* implicit 'a' */
      if (input[i + cons.length] === "a") {
        output += consChar.slice(0, -1);
        i += cons.length + 1;
        prevConsonant = false;
        continue;
      }

      output += consChar;
      i += cons.length;
      prevConsonant = true;
      continue;
    }

    /* vowels */
    const vowel = longestMatch(vowelTrie, input, i);
    if (vowel) {
      output += independentVowels[vowel];
      i += vowel.length;
      prevConsonant = false;
      continue;
    }

    output += input[i];
    i++;
  }
  // logUnicode(output)
  return output;
}