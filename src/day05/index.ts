import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const seeds : number[] = rawInput.split("\n")[0].substring(7).split(" ").map(s => Number(s));

  const maps : number[][][] = rawInput.split("\n\n").slice(1).map(s => s.split("\n").slice(1).map(m => m.split(" ").map(ns => Number(ns))));
  return {
    seeds: seeds,
    maps: maps
  };
};

const mapValue = (val : number, destStart : number, srcStart : number, range : number) : number => {
  const min = srcStart;
  const max = srcStart + (range - 1);
  if(min <= val && val <= max)
    return destStart + (val - srcStart);
  return val;
};

const part1 = (rawInput: string) => {
  const values = parseInput(rawInput);
  const seeds = values.seeds;
  const maps = values.maps;

  for(let m = 0; m < maps.length; m++) {
    const map = maps[m];
    for(let i = 0; i < seeds.length; i++) {
      let seed = seeds[i];
      let mapped = seed;
      for(let r = 0; r < map.length && mapped == seed; r++) {
        const range = map[r];
        mapped = mapValue(seed, range[0], range[1], range[2]);
      }
      seeds[i] = mapped;
    }
  }

  return seeds.reduce((p, c) => Math.min(p, c));
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const values = parseInput(rawInput);
  const seeds = values.seeds;
  const maps = values.maps;

  let seed_ranges = [];
  for(let i = 0; i < seeds.length; i++) if(i%2 == 0) seed_ranges.push([seeds[i], seeds[i+1]]);

  for(let m = 0; m < maps.length; m++) {
    const map = maps[m];
    let new_ranges = []
    for(let r = 0; r < seed_ranges.length; r++) {
      const seed_range = seed_ranges[r];
      const smin = seed_range[0];
      const smax = smin + seed_range[1] - 1;

      let bdelta = [];
      for(let i = 0; i < map.length; i++) {
        const map_range = map[i];
        const dmin = map_range[0];
        const mmin = map_range[1];
        const mmax = mmin + map_range[2] - 1;

        const overlap : boolean = Math.max(smax, mmax) - Math.min(smin, mmin) <= seed_range[1] + map_range[2] - 2;
        if(overlap) {
          const st = Math.max(smin, mmin);
          const en = Math.min(smax, mmax);
          const nrange = en - st + 1;
          const offset = st - mmin;

          const delta = (dmin - mmin);
          const new_range = [st + delta, nrange];
          bdelta.push([st, nrange]);
          new_ranges.push(new_range);
        }
      }
      bdelta.sort((a, b) => a[0] - b[0]);
      let base = smin;
      const origl = bdelta.length;
      for(let i = 0; i < origl; i++) {
        const interval = bdelta[i];
        const rmin = interval[0];
        const range = interval[1];

        if(rmin - base > 0) {
          new_ranges.push([base, rmin - base]);
        }
        base = rmin + range;
      }
      if(smax - base > 0) new_ranges.push([base, smax - base + 1]);
    }
    seed_ranges = new_ranges;
  }
  return seed_ranges.map(r => r[0]).reduce((p, c) => Math.min(p, c));
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
