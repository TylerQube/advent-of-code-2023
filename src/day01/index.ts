import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const lines : string[] = rawInput.split("\n");

  let arr : string[][] = [];
  for(let i = 0; i < lines.length; i++) {
    arr.push(lines[i].split(""));
  }
  return arr;
};

const part1 = (rawInput: string) => {
  const arr = parseInput(rawInput);
  let sum : number = 0;
  for(let i = 0; i < arr.length; i++) {
    const line : string[] = arr[i];
    const nums : number[] = line.map((str) => Number(str)).filter((num) => !isNaN(num));
    const num = nums[0]*10 + nums[nums.length - 1];
    sum += num;
  }
  return sum;
};

const nmap = new Map();
nmap.set('one', 1);
nmap.set('two' ,2);
nmap.set('three', 3);
nmap.set('four', 4);
nmap.set('five', 5);
nmap.set('six', 6);
nmap.set('seven', 7);
nmap.set('eight', 8);
nmap.set('nine', 9);



const part2 = (rawInput: string) => {
  const arr = parseInput(rawInput);
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    const arrline : string[] = arr[i];
    let line : string = arrline.join("");

    let ff : boolean = false;
    for(let ind = 0; !ff && ind <= line.length; ind++) {

      nmap.forEach((val, key, map) => {
        let fstr = line.substring(0, ind);
        let estr = line.substring(ind, line.length);
        if(fstr.includes(key)) ff = true;

        line = fstr.replaceAll(key, val.toString()).concat(estr);
      });

      let char : string = line.substring(ind, ind+1);
      if(!isNaN(Number(char))) ff = true;
    }
    for(let ind = line.length; ff && ind >= 0; ind--) {

      nmap.forEach((val, key, map) => {
        let fstr = line.substring(ind, line.length);
        let estr = line.substring(0, ind);
        if(fstr.includes(key)) {
          ff = false;
        } 

        line = estr.concat(fstr.replace(key, val.toString()));
      });

      let char = line.substring(ind-1, ind);
      if(!isNaN(Number(char))) {
        break;
      }
    }

    // sum parsed input
    let linearr : string[] = line.split("");
    const nums : number[] = linearr.map((str) => Number(str)).filter((num) => !isNaN(num));
    const num = nums[0]*10 + nums[nums.length - 1];
    sum += num;
  }
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
