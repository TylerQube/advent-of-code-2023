import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const cs = rawInput.split("\n").map(c => c.split(" | "));
  cs.map(c => {c[0] = c[0].substring(c[0].indexOf(":") + 2)});
  const cards = cs.map(c => c.map(l => l.split(" ").filter(n => n != "").map(n => Number(n))));
  return cards;
};

const part1 = (rawInput: string) => {
  const cards = parseInput(rawInput);
  let sum = 0;
  let matches = 0;
  cards.map(c => {
    c[1].map(n => {
      if(c[0].includes(n)) {
      // console.log(c[0] + ":: has " + n);
      matches++;
      } 
    });
    // console.log("[" + c[0] + "] [" + c[1] + "] " + matches);
    if(matches > 0) sum += Math.pow(2, matches - 1);
    matches = 0;
  })
  return sum;
};

const part2 = (rawInput: string) => {
  const cards = parseInput(rawInput);
  let queue = [];
  cards.map(c => {queue.push(cards.indexOf(c))});
  let sum = 0;
  let matches = 0;

  for(let i = 0; i < queue.length; i++) {
    const cardn = queue[i];
    const c = cards[cardn];
    c[1].map(n => {
      if(c[0].includes(n)) {
        matches++;
      } 
    });

    for(let n = 0; n < matches; n++) {
      queue.push(cardn + n + 1);
    }
    matches = 0;
  }
  return queue.length;
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
