const mongoCollections = require("../config/mongoCollection");
const ideas = mongoCollections.IdeaBoard;
const uuid = require("uuid/v4");

async function getAllIdeas(){
    const ideaCollection = await ideas();
    return await ideaCollection.find({}).toArray();
}

async function addIdea(title, descripton){
    if (!title){
        throw "title is needed";
    }
    if (!descripton){
        throw "descripton is needed";
    }
    
    if (typeof title !== "string"){
        throw "title needs to be string";
    }
    if (typeof descripton !== "string"){
        throw "descripton needs to be string";
    }

    const newId = uuid();
    let newCollection = await ideas();
    let newIdea = {
        _id: newId,
        title: title,
        descripton: descripton
    }

    const insert = await newCollection.insertOne(newIdea);
    if (insert.length === 0){
        throw "Item could not be added";
    }
}

async function deleteIdea(id) {
    if (!id){
        throw "An id is needed for deleting.";
    }
    
    let newCollection = await ideas();
    const idea = await newCollection.removeOne({ _id: id });

    if (idea === null){
        throw "No idea with id of " + id;
    }
}

module.exports = {
    getAllIdeas,
    addIdea,
    deleteIdea
}