import fs from "node:fs";

const src = process.argv[2];
const data = JSON.parse(fs.readFileSync(src, "utf-8"));

const mapping = {
  "Aland Islands": "Aland",
  "Bonaire, Saint Eustatius and Saba ": "Bonaire",
  "Cocos Islands": "Cocos (Keeling) Islands",
  "Cabo Verde": "Cape Verde",
  Czechia: "Czech Republic",
  Myanmar: "Myanmar (Burma)",
  Pitcairn: "Pitcairn Islands",
  "Palestinian Territory": "Palestine",
  "Timor Leste": "East Timor",
  Vatican: "Vatican City",
};

for (const country in data) {
  if (mapping[country]) {
    data[mapping[country]] = data[country];
    delete data[country];
  }
}

fs.writeFileSync(src, JSON.stringify(data));
