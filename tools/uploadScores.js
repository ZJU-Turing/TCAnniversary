import fs from "fs/promises";
import Papa from "papaparse";
import lc from "../src/assets/js/leancloud.js";

const CSV_PATH = "tools/scores.csv";

const rmNulls = (r) =>
    Object.entries(r).reduce((a, [k, v]) => {
        if (v) a[k] = v;
        return a;
    }, {});

const getCSV = async () => {
    let csv = await fs.readFile(CSV_PATH, "utf8");
    csv = csv.split("\n").slice(14).join("\n");
    csv = Papa.parse(csv, { header: true }).data;
    csv = csv.map(rmNulls);
    csv = csv.filter((r) => Object.keys(r).length);
    return csv;
};

const transform = (csv) => {
    let ret = [];
    for (let r of csv) {
        let t = { name: r["昵称"], type: r["类别"], link: r["链接"] };
        let cnt = 0;
        t.score = Object.entries(r).reduce((a, [k, v]) => {
            if (k.endsWith("评分")) {
                cnt++;
                a += +v;
            }
            return a;
        }, 0);
        if (cnt) t.score /= cnt;
        ret.push(t);
    }
    return ret;
};

(async () => {
    console.log("Initializing LeanCloud.");
    lc.init();

    console.log("Parsing CSV");
    let csv = await getCSV();
    let data = transform(csv);

    console.log("Clearing scores.");
    await lc.clearAll("Score");

    console.log("Uploading scores.");
    let toUpdate = data.map((d) => lc.createItemRaw("Score", d));
    await lc.AV.Object.saveAll(toUpdate);

    console.log("Done.");
})();
