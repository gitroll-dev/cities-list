import list from "countries-list/minimal/countries.en.min.json";
import c from "../world-cities.nano.json";

const lset = new Set(Object.values(list));
const cset = new Set(Object.keys(c));

const less = new Set([...lset].filter((x) => !cset.has(x)));
console.log("less", less);

const more = new Set([...cset].filter((x) => !lset.has(x)));
console.log("more", more);

if (less.size || more.size) {
  process.exit(1);
}
