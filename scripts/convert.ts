import fs from "node:fs";
import { parse } from "csv-parse/sync";
import type { Geo, GeoTuple } from "./types.js";

const src = process.argv[2]; // csv from https://github.com/datasets/world-cities
const dest = process.argv[3] || src.replace(/\.csv$/, ".json");
const mini = process.argv[4] || src.replace(/\.csv$/, ".mini.json");
const nano = process.argv[5] || src.replace(/\.csv$/, ".nano.json");
const csv = fs.readFileSync(src, "utf-8");

const records: Geo[] = parse(csv, { columns: true, skip_empty_lines: true });
console.log(`Parsed ${records.length} records`);

const tree: Record<string, Geo[]> = {};

for (const record of records) {
  const { country } = record;
  if (!tree[country]) {
    tree[country] = [];
  }
  tree[country].push(record);
}

let largest = 0;
for (const country in tree) {
  tree[country].sort((a, b) => a.name.localeCompare(b.name));
  largest = Math.max(largest, tree[country].length);
}
console.log(`Largest country has ${largest} records`);

fs.writeFileSync(dest, JSON.stringify(tree));

const miniTree: Record<string, GeoTuple[]> = {};

for (const country in tree) {
  miniTree[country] = tree[country].map(({ name, subcountry, geonameid }) => [
    name,
    subcountry,
    geonameid,
  ]);
}

fs.writeFileSync(mini, JSON.stringify(miniTree));

const nanoTree: Record<string, string[]> = {};

for (const country in tree) {
  nanoTree[country] = tree[country].map(
    ({ name, subcountry }) => `${name}, ${subcountry}`
  );
}

fs.writeFileSync(nano, JSON.stringify(nanoTree));
