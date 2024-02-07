import fs from "fs/promises";
import Papa from "papaparse";
import lc from "../src/assets/js/leancloud.js";

const CSV_PATH = "tools/aliases.csv";

const rmNulls = (r) =>
    Object.entries(r).reduce((a, [k, v]) => {
        if (v) a[k] = v;
        return a;
    }, {});

const getCSV = async () => {
    let csv = await fs.readFile(CSV_PATH, "utf8");
    csv = Papa.parse(csv, { header: true }).data;
    csv = csv.map(rmNulls);
    csv = csv.filter((r) => Object.keys(r).length);
    return csv;
};

const transform = (csv) =>
    csv.map((r) => Object({ key: r["昵称"], value: r["展示名称"] }));

(async () => {
    console.log("Initializing LeanCloud.");
    lc.init();

    console.log("Parsing CSV");
    let csv = await getCSV();
    let data = transform(csv);

    console.log("Clearing aliases.");
    await lc.clearAll("Alias");

    console.log("Uploading aliases.");
    let toUpdate = data.map((d) => lc.createItemRaw("Alias", d));
    await lc.AV.Object.saveAll(toUpdate);

    console.log("Done.");
})();
