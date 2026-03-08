import { map, matraMap, independentVowels } from "./transliterationMap";

const VIRAMA = "್";

/* ---------- TRIE BUILDER ---------- */

function buildTrie(tokens){

  const root={};

  for(const token of tokens){

    let node=root;

    for(const c of token){

      if(!node[c]) node[c]={};

      node=node[c];
    }

    node.$=token;
  }

  return root;
}

const consonantTrie=buildTrie(Object.keys(map));
const vowelTrie=buildTrie(Object.keys(matraMap));

/* ---------- LONGEST MATCH ---------- */

function longestMatch(trie,input,start){

  let node=trie;
  let match=null;
  let i=start;

  while(i<input.length && node[input[i]]){

    node=node[input[i]];

    if(node.$) match=node.$;

    i++;
  }

  return match;
}

/* ---------- MATRA APPLICATION ---------- */

function applyMatra(consonant,vowel){

  const matra=matraMap[vowel];

  if(matra==="") return consonant.slice(0,-1);

  return consonant.slice(0,-1)+matra;
}

/* ---------- NASAL RULE ---------- */

function applyAnusvaraRule(prev,next){

    if(next.startsWith("k") || next.startsWith("g"))
      return "ಂ";
  
    if(next.startsWith("c") || next.startsWith("j"))
      return "ಂ";
  
    if(next.startsWith("t") || next.startsWith("d"))
      return "ಂ";
  
    if(next.startsWith("p") || next.startsWith("b"))
      return "ಂ";
  
    return null;
  }

/* ---------- MAIN ENGINE ---------- */

export function transliterate(input){

  let output="";
  let i=0;
  let prevConsonant=false;

  while(i<input.length){

    const cons=longestMatch(consonantTrie,input,i);

    if(cons){

      const consChar=map[cons];

      const vowel=longestMatch(vowelTrie,input,i+cons.length);

      if(vowel){

        output+=applyMatra(consChar,vowel);

        i+=cons.length+vowel.length;

        prevConsonant=false;

        continue;
      }

      /* implicit 'a' */

      if(input[i+cons.length]==="a"){

        output+=consChar.slice(0,-1);

        i+=cons.length+1;

        prevConsonant=false;

        continue;
      }

      output+=consChar;

      i+=cons.length;

      prevConsonant=true;

      continue;
    }

    /* vowels */

    const vowel=longestMatch(vowelTrie,input,i);

    if(vowel){

      output+=independentVowels[vowel];

      i+=vowel.length;

      prevConsonant=false;

      continue;
    }

    /* automatic anusvara */

    if(input[i]==="m"){

        const nextCons = longestMatch(consonantTrie,input,i+1);
      
        if(nextCons){
      
          if(
            nextCons.startsWith("k") ||
            nextCons.startsWith("g") ||
            nextCons.startsWith("c") ||
            nextCons.startsWith("j") ||
            nextCons.startsWith("t") ||
            nextCons.startsWith("d") ||
            nextCons.startsWith("p") ||
            nextCons.startsWith("b")
          ){
            output+="ಂ";
            i++;
            continue;
          }
      
        }
      
      }

    output+=input[i];

    i++;
  }

  return output;
}