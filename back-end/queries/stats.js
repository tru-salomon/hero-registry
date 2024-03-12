const db = require("../db/dbConfig.js");

const getAllStats = async () => {
    try {
        const allStats = await db.any("SELECT * FROM stats");
        return allStats
    } catch (error) {
        return error;
    }
};

const getStat = async (key) => {
    try {
        const oneId = await db.one("SELECT * FROM stats WHERE key=$1", key);
        return oneId;
    } catch (error) {
        return error;
    }
};

const createStat = async (stat) => {
    try {
        const newId = await db.one(
            "INSERT INTO stats (alias, lastname, dob, adult) VALUES($1, $2, $3, $4) RETURNING *", [stat.alias, stat.lastname, stat.dob, stat.adult]
        );
        return newId
    } catch (error) {
        throw error;
    }
}

const deleteStat = async (key) => {
    try {
        const deletedStat = await db.one(
            "DELETE FROM stats WHERE key = $1 RETURNING *",
            key
        );
        return deletedStat
    } catch (error) {
        return error;
    }
};

const updateStat = async (key, stat) => {
    try {
        const updatedStat = await db.one(
            "UPDATE stats SET alias=$1, lastname=$2, dob=$3, adult=$4 WHERE key=$5 RETURNING *",
            [stat.alias, stat.lastname, stat.dob, stat.adult, key]
        );
        return updatedStat;
    } catch (error) {
        return error;
    }
};


module.exports = {
    getAllStats,
    getStat,
    createStat,
    deleteStat,
    updateStat
};