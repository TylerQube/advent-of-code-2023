import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

class Node {
  name: string
  left: string
  right: string
};

const parseNode = (str: string) : Node => {
  const n = new Node();
  n.name = str.substring(0, 3);
  n.left = str.substring(str.indexOf("(") + 1, str.indexOf(","));
  n.right = str.substring(str.indexOf(",") + 2, str.indexOf(")"));
  return n;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inst : string[] = input[0].split("");
  const nodes : Node[] = input.slice(2).map(s => parseNode(s));

  let steps = 0;
  let cur : Node = nodes[nodes.findIndex(n => n.name == "AAA")];
  for(let i = 0; cur && cur.name != "ZZZ"; i++) {
    const turn : string = inst[i % inst.length];
    const prev = cur;
    const name = turn == "L" ? cur.left : cur.right
    cur = nodes[nodes.findIndex(n => n.name == name)];
    steps++;
  }

  return steps;
};

// from https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
const gcd = (a, b) => b == 0 ? a : gcd (b, a % b)
const lcm = (a, b) =>  a / gcd (a, b) * b

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inst : string[] = input[0].split("");
  const nodes : Node[] = input.slice(2).map(s => parseNode(s));

  let steps = 0;
  let cur_nodes : Node[] = nodes.filter(n => n.name.charAt(n.name.length-1) == "A");
  console.log(cur_nodes);
  console.log(cur_nodes.length);
  let z_steps = Array(cur_nodes.length).fill(-1);
  for(let i = 0; cur_nodes.filter(n => n.name.charAt(n.name.length-1) != "Z").length > 0; i++) {
    const turn : string = inst[i % inst.length];
    steps++;

    for(let j = 0; j < cur_nodes.length; j++) {
      const cur = cur_nodes[j];
      const name = turn == "L" ? cur.left : cur.right
      cur_nodes[j] = nodes[nodes.findIndex(n => n.name == name)];
      if(cur_nodes[j].name.charAt(2) == "Z" && z_steps[j] == -1) z_steps[j] = steps;
    }

    if(z_steps.filter(n => n == -1).length == 0) break;
  }
  console.log(z_steps);
  return z_steps.reduce((p, c) => lcm(p, c));
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
