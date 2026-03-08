import { map, matraMap, VIRAMA } from "./transliterationMap_old";

const vowels = [
  "ai","au","ee","oo","aa",
  "a","i","u","e","o","E","O","A"
];

function findVowel(input,i){

  for(let v of vowels){
    if(input.startsWith(v,i)) return v;
  }

  return null;
}

function longestConsonant(input,i){

  for(let len=3; len>=1; len--){

    const token=input.slice(i,i+len);

    if(map[token] && map[token].endsWith(VIRAMA)){
      return token;
    }

  }

  return null;
}

function applyMatra(consonant,vowel){

  const matra=matraMap[map[vowel]];

  if(!matra) return consonant.replace(VIRAMA,"");

  return consonant.replace(VIRAMA,"")+matra;
}

export function transliterate(input){

  let output="";
  let i=0;

  while(i<input.length){

    const cons=longestConsonant(input,i);

    if(cons){

      const consonant=map[cons];
      const vowel=findVowel(input,i+cons.length);

      if(vowel){

        output+=applyMatra(consonant,vowel);
        i+=cons.length+vowel.length;

      }else{

        output+=consonant;
        i+=cons.length;

      }

      continue;
    }

    const vowel=findVowel(input,i);

    if(vowel){
      output+=map[vowel];
      i+=vowel.length;
      continue;
    }

    output+=input[i];
    i++;

  }

  return output;

}