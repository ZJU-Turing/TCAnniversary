import fs from "fs/promises";
import Papa from "papaparse";
import lc from "../src/assets/js/leancloud.js";

const START_DATE = "2024-02-08T06:26:19.456Z";
const DIST_PATH = "tools/remarks.csv";

const getValidRemarks = async () => {
    let rs = await lc.searchNew("Remark", START_DATE, false);
    rs = rs.filter((r) => r.name);
    if (!rs.length) return { rs: [], latest: START_DATE };
    let latest = rs[rs.length - 1].createdAt;
    rs = rs.map((r) => [
        r.name,
        "remark",
        `https://tsk.xecades.xyz/#${r.objectId}`,
        r.comment,
    ]);
    return { rs, latest };
};

(async () => {
    lc.init();
    const { rs, latest } = await getValidRemarks();
    await fs.writeFile(DIST_PATH, Papa.unparse(rs), { flag: "w" });
    if (rs.length) console.log("Remarks updated.");
    else console.log("No new remarks.");
    console.log("Latest record: " + latest);
})();
