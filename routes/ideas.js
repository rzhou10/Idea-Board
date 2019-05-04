const express = require("express");
const router = express.Router();
const data = require("../data");
const ideaData = data.ideas;

router.get("/", async (req, res) => {
    try {
        const ideaList = await ideaData.getAllIdeas();
        res.json(ideaList);
    }
    catch (err){
        res.status(500).json({route: "get", error: err});
    }
});

router.post("/add", async (req, res) => {
    const info = req.body;

    if (!info){
        res.status(400).json({ error: "Data is needed" });
    }
    if (!info.title){
        res.status(400).json({ error: "Title is needed" });
    }
    if (!info.description){
        res.status(400).json({ error: "description list is needed" });
    }

    try {
        const title = info.title;
        const description = info.description;

        const newIdea = await ideaData.addIdea(title, description);
    }
    catch (err){
        res.status(500).json({route: "add", error: err});
    }
});

router.delete("/delete/:id", async (req, res) => {
    try{
        const deleteIdea = await ideaData.deleteIdea(req.params.id);
    }
    catch (err){
        res.status(500).json({route: "delete/:id", error: err});
    }
});

module.exports = router;