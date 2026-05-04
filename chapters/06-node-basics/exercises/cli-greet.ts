// A tiny CLI. Run with:
//   npm run ex chapters/06-node-basics/exercises/cli-greet.ts -- Ada
//   npm run ex chapters/06-node-basics/exercises/cli-greet.ts -- Ada Grace
//
// It should print "Hello, <name>!" once per name, or fall back to "world" if
// no names are given.
//
// Everything past "--" becomes the args in process.argv (after the first two
// standard entries for node and the script path).

import { argv } from "node:process";

const names = argv.slice(2);
// TODO: if `names` is empty, default to ["world"], then print one greeting per name.
