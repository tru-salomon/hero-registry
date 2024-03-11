
const express = require("express");
const stats = express.Router();
const { getAllStats, getStat, updateStat, deleteStat, createStat } = require("../queries/stats.js");
const { checkAlias, checkLastname, checkDob, checkAdult } = require("../validations/checkStats.js");


// INDEX
stats.get("/", async (req, res) => {
    const allIds = await getAllStats();
    if (allIds[0]) {
        res.status(200).json(allIds);
    } else {
        res.status(500).json({ error: "server error" });
    }
});

// SHOW
stats.get("/:key", async (req, res) => {
    const { key } = req.params;
    const id = await getStat(key);
    if (id) {
        res.json(id);
    } else {
        res.status(404).json({ error: "not found" });
    }
});

//CREATE
stats.post("/", checkAlias, checkLastname, checkDob, checkAdult, async (req, res) => {
    const id = await createStat(req.body);
    res.status(200).json(id);
});

//DELETE
stats.delete("/:key", async (req, res) => {
    const { key } = req.params;
    const deletedId = await deleteStat(key)
    if (deletedId.key) {
        res.status(200).json(deletedId)
    } else {
        res.status(404).json("Id not found")
    }
});

// UPDATE
stats.put("/:key", checkAlias, checkLastname, checkDob, checkAdult, async (req, res) => {
    const { key } = req.params;
    const updatedId = await updateStat(key, req.body);
    res.status(200).json({ updatedId });
});

module.exports = stats;