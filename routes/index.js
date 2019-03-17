const ideaRoutes = require("./ideas");

const constructorMethods = function constructorMethods(app){
    app.use("/", ideaRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
}

module.exports = constructorMethods;