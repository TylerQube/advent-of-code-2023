import run from "aocrunner";

const parseInput = (rawInput: string) : number[][] => rawInput.split("\n").map(h => h.split(" ").map(s => Number(s)));

const part1 = (rawInput: string, part2: boolean = false) => {
  const histories = parseInput(rawInput);

  let next_vals = [];
  for(let hist of histories) {
    if(part2) hist = hist.reverse();
    let darr = hist;
    let deltas : number[][] = [];
    deltas.push(darr);
    do {
      darr = darr.map((n, i) => {
        if(i < darr.length-1) return darr[i+1] - darr[i];
        else return NaN;
      }).filter(n => !isNaN(n));
      deltas.push(darr);
    } while (darr.filter(n => n != 0).length > 0);

    for(let i = deltas.length - 1; i > 0; i--) {
      const delta = deltas[i][deltas[i].length-1];
      deltas[i-1].push(deltas[i-1][deltas[i-1].length-1] + delta);
    }
    next_vals.push(deltas[0][deltas[0].length - 1]);
  }
  return next_vals.reduce((p, c) => p + c);
};

const part2 = (rawInput: string) => {
  return part1(rawInput, true);
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
