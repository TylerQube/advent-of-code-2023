import run from "aocrunner";

const parseInput = (rawInput: string) => {
  rawInput = rawInput.replaceAll(/ {1,}/g," ");
  const times = rawInput.split("\n")[0].split(" ").slice(1).map(s => Number(s));
  const distances = rawInput.split("\n")[1].split(" ").slice(1).map(s => Number(s));

  const arr = [];
  arr.push(times);
  arr.push(distances);
  return arr;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const times : number[] = input[0];
  const distances : number[] = input[1];
  let prod = 0;
  for(let i = 0; i < times.length; i++) {
    const time : number = times[i];
    const record = distances[i];
    let numWays = 0;
    for(let i = 1; i <= time; i++) {
      const speed = i;
      const remaining = time - i;
      const dist = speed * remaining;
      if(dist > record) numWays++;
    }
    prod = prod > 0 ? prod * numWays : numWays;
  }
  return prod;
};

const part2 = (rawInput: string) => {
  const input : number[][] = parseInput(rawInput);
  const time = Number(input[0].join(""));
  const record = Number(input[1].join(""));
  let numWays = 0;
  for(let i = 1; i <= time; i++) {
    const speed = i;
    const remaining = time - i;
    const dist = speed * remaining;
    if(dist > record) numWays++;
  }
  return numWays;
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
