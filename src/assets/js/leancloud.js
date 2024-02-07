import AV from "leancloud-storage";

async function getAllData(type, limit = 1000) {
    let query = new AV.Query(type);
    query.limit(limit);
    let results = await query.find();
    return results.map((c) => c.toJSON());
}

async function checkExistence(type, key, value) {
    let query = new AV.Query(type);
    query.equalTo(key, value);
    query.limit(1);
    let results = await query.find();
    return results.length > 0;
}

async function removeItem(type, id) {
    let item = AV.Object.createWithoutData(type, id);
    await item.destroy();
}

async function updateItem(type, id, data) {
    let item = AV.Object.createWithoutData(type, id);
    for (let key in data) item.set(key, data[key]);
    await item.save();
}

function createItemRaw(type, data) {
    let Item = new AV.Object.extend(type);
    let item = new Item();
    for (let key in data) item.set(key, data[key]);
    return item;
}

async function createItem(type, data) {
    let item = createItemRaw(type, data);
    await item.save();
}

async function clearAll(type, limit = 1000) {
    let query = new AV.Query(type);
    query.limit(limit);
    let results = await query.find();
    await AV.Object.destroyAll(results);
}

async function searchEqualTo(type, key, value, limit = 1000) {
    let query = new AV.Query(type);
    query.equalTo(key, value);
    query.limit(limit);
    let results = await query.find();
    return results.map((c) => c.toJSON());
}

async function searchNew(type, date, includeSelf = false, limit = 1000) {
    let query = new AV.Query(type);
    let fn = includeSelf ? "greaterThanOrEqualTo" : "greaterThan";
    query[fn]("createdAt", new Date(date));
    query.limit(limit);
    let results = await query.find();
    return results.map((c) => c.toJSON());
}

async function getById(type, id) {
    let query = new AV.Query(type);
    let result = await query.get(id);
    return result.toJSON();
}

function init() {
    let env = import.meta.env ?? process.env;
    AV.init({
        appId: env.VITE_APP_ID,
        appKey: env.VITE_APP_KEY,
        serverURL: env.VITE_SERVER_URL,
    });
}

const checkPassword = (p, type) => checkExistence(type, "value", p);

const lc = {
    AV,
    init,
    checkPassword,
    getAllData,
    checkExistence,
    removeItem,
    updateItem,
    createItem,
    createItemRaw,
    clearAll,
    searchEqualTo,
    searchNew,
    getById,
};

export default lc;
