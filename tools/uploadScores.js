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
    csv = csv.split("\n").slice(1).join("\n");
    csv = csv.replace(",,,,", "昵称,类别,链接,详情,");
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
        let skip = ["昵称", "类别", "链接", "详情"];
        t.score = Object.entries(r).reduce((a, [k, v]) => {
            if (!skip.includes(k)) {
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
