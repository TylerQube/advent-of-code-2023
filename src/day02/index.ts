import run from "aocrunner";

const parseInput = (rawInput: string) => {
  let lines : string[] = rawInput.split("\n");
  // remove game header
  lines = lines.map((str) => str.substring(str.indexOf(": ") + 2));
  // parse into games and rounds
  let gstrs : string[][] = lines.map((str) => str.split("; "));
  let games : number[][][] = [];
  for(let g = 0; g < gstrs.length; g++) {
    games.push([]);
    let game = gstrs[g];
    for(let r = 0; r < game.length; r++) {
      games[g][r] = [0, 0, 0];
      let round : string = game[r];

      const num_colors = round.split(",").length;
      let colors : string[] = ["red", "green", "blue"];
      for(let i = 0; i < num_colors; i++) {
        for(const col of colors) {
          let str : string = round.substring(0, round.indexOf(",") != -1 ? round.indexOf(",") : round.length);
          if(str.indexOf(col) != -1) {
            games[g][r][colors.indexOf(col)] = Number(str.substring(0, str.indexOf(" ")));
            round = round.substring(round.indexOf(", ") + 2);
            break;
          }
        }
      }
    }
  }
  return games;
};

const nums = [12, 13, 14];
const part1 = (rawInput: string) => {
  const games : number[][][] = parseInput(rawInput);

  let sum = 0;
  games.map(g => {
    const game : number = games.indexOf(g) + 1;
    let possible : boolean = true;
    g.map(r => {
      for(let i = 0; i < 3; i++) {
        if(r[i] > nums[i]) possible = false;
      }
    });
    if(possible) sum += game;
  });
  return sum;
};

const part2 = (rawInput: string) => {
  const games : number[][][] = parseInput(rawInput);

  let sum = 0;
  games.map(g => {
    const game : number = games.indexOf(g) + 1;
    let mins : number[] = [0, 0, 0];
    g.map(r => {
      for(let i = 0; i < 3; i++) {
        mins[i] = Math.max(mins[i], r[i]);
      }
    });
    const power = mins.reduce((prev, cur) => prev*cur);
    sum += power;
  });
  return sum;
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
