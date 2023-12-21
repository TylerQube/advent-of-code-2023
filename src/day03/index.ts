import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const isPartNum = (schem : string[], rowNum : number, s : number, e : number) => {
  for(let row = rowNum - 1; row <= rowNum + 1; row++) {
    for(let col = s - 1; col < e + 1; col++) {
      if(row < 0 || row >= schem.length || col < 0 || col >= schem[row].length) continue;
      if(row == rowNum && col >= s && col < e) continue;
      const char : string = schem[row][col];
      // console.log(schem[rowNum].substring(s, e) + ": " + char);
      if(char != ".") return true;
    }
  }
  return false;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const arr = input.split("\n");
  let nums : number[] = [];

  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].length; j++) {
      if(isNaN(Number(arr[i].charAt(j)))) continue;
      let sInd = j;
      let eInd = j+1;
      while(eInd < arr[i].length && !isNaN(Number(arr[i].charAt(eInd)))) eInd++;

      // verify if part num
      if(isPartNum(arr, i, sInd, eInd)) nums.push(Number(arr[i].substring(sInd, eInd)));
      j = eInd;
    }
  }
  // console.log(nums);
  return nums.reduce((p, c) => p + c);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const arr = input.split("\n");
  let gearArr : number[][] = Array(arr.length).fill(null).map(()=>Array(arr[0].length).fill(1));
  let numAdj : number[][] = Array(arr.length).fill(null).map(()=>Array(arr[0].length).fill(0));

  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].length; j++) {
      if(isNaN(Number(arr[i].charAt(j)))) continue;
      let s = j;
      let e = j+1;
      while(e < arr[i].length && !isNaN(Number(arr[i].charAt(e)))) e++;

      for(let row = i - 1; row <= i + 1; row++) {
        for(let col = s - 1; col < e + 1; col++) {
          if(row < 0 || row >= arr.length || col < 0 || col >= arr[row].length) continue;
          if(row == i && col >= s && col < e) continue;
          const char : string = arr[row].charAt(col);
          if(char == "*") {
            numAdj[row][col] += 1;
            gearArr[row][col] *= Number(arr[i].substring(s, e));
          }
        }
      }

      j = e;
    }
  }

  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].length; j++) {
      if(numAdj[i][j] >= 2) sum += gearArr[i][j];
    }
  }
  // console.log(numAdj);
  // console.log(gearArr);
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 4361,
      },
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
