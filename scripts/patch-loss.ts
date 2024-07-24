import fs from "node:fs";

const src = process.argv[2];
const data = JSON.parse(fs.readFileSync(src, "utf-8"));

const missing = [
  "Antarctica",
  "Bouvet Island",
  "Heard Island and McDonald Islands",
  "British Indian Ocean Territory",
  "Tokelau",
  "U.S. Minor Outlying Islands",
];

for (const country of missing) {
  data[country] = [country];
}

fs.writeFileSync(src, JSON.stringify(data));
