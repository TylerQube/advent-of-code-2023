import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");


const types = new Map();
const amt = 7;
types.set("five", amt - types.size);
types.set("four", amt - types.size);
types.set("full", amt - types.size);
types.set("three", amt - types.size);
types.set("two pair", amt - types.size);
types.set("one pair", amt - types.size);
types.set("high", amt - types.size);

const getMax = (str : string) : string => {
  var max = 0,
      maxChar = '';
   str.split('').forEach(function(char){
     if(str.split(char).length > max) {
         max = str.split(char).length;
         maxChar = char;
      }
   });
   return maxChar;
 };

const hands = ["high", "one pair", "two pair", "three", "full", "four", "five"];
const handType = (s : string, jokers : boolean = false) => {
  let hand = s.substring(0, 5);
  const fchar : string = getMax(!jokers ? hand : hand.replaceAll("J", ""));
  if(jokers) hand = hand.replaceAll("J", fchar);
  const nfchar : number = hand.split("").filter(c => c == fchar).join("").length;


  const num_unique = (new Set(hand)).size;
  if(num_unique == 5) return "high";
  if(num_unique == 4) return "one pair";

  if(num_unique == 3 && nfchar == 2) return "two pair";
  if(num_unique == 3 && nfchar == 3) return "three";

  if(num_unique == 2 && nfchar == 3) return "full";
  if(num_unique == 2 && nfchar == 4) return "four";
  
  return "five";
}

const compareHands = (a, b, jokers : boolean = false) => {
  const diff = types.get(handType(a, jokers)) - types.get(handType(b, jokers));
  if(diff == 0) {
    // compare with high card
    for(let i = 0; i < a.length; i++) {
      const cdiff = compareCard(a.charAt(i), b.charAt(i), jokers);
      if(cdiff != 0) return cdiff;
    }
  }
  return diff;
};

const strengths : string[] = ["A", "K", "Q", "J", "T"];
const compareCard = (s1 : string, s2 : string, jokers : boolean = false) : number => {
  if(jokers) {
    s1 = s1.replace("J", "0");
    s2 = s2.replace("J", "0");
  }
  if(s1 == s2) return 0;
  if(!isNaN(Number(s1)) && !isNaN(Number(s2))) {
    if(Number(s1) >= Number(s2)) return Number(s1) == Number(s2) ? 0 : 1;
    return -1;
  } else if(!isNaN(Number(s2))) {
    return 1;
  } else if(!isNaN(Number(s1))) {
    return -1;
  }

  const i1 = strengths.indexOf(s1);
  const i2 = strengths.indexOf(s2); 
  if(i1 == i2) return 0;   
  if(i1 < i2)  return 1;
  else         return -1;
};

const part1 = (rawInput: string) => {
  const hands = parseInput(rawInput);
  const sorted = hands.sort(compareHands);

  let total = 0;
  for(let i = 0; i < sorted.length; i++) {
    const hand = sorted[i].substring(0, 5);
    const bet : number = Number(sorted[i].substring(sorted[i].indexOf(" ") + 1));
    total += bet * (i + 1);
  }
  return total;
};

const part2 = (rawInput: string) => {
  const hands = parseInput(rawInput);
  const sorted = hands.sort((a, b) => compareHands(a, b, true));

  let total = 0;
  for(let i = 0; i < sorted.length; i++) {
    const hand = sorted[i].substring(0, 5);
    const bet : number = Number(sorted[i].substring(sorted[i].indexOf(" ") + 1));
    total += bet * (i + 1);
  }
  return total;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
