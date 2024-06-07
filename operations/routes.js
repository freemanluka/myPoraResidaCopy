const express = require("express");
const contactsRouter = require("../routes/contacts");
const usersRouter = require("../routes/users");
const {VERSION} = require("../config/envConfig")

module.exports = (app) =>{
    // set cors
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
    
        if (req.method === "OPTIONS") {
            res.header ("Access-Control-Allow-Methods", "PUT, GET, PATCH, DELETE");
            return res.status(200).json({});
        }
        
        next();
        });
    
    app.use(express.urlencoded({ extended: true}));
    app.use(express.json({ limit: '100mb'}))

app.use(`${VERSION}/contacts` , contactsRouter);
app.use(`${VERSION}/users` , usersRouter);

app.get("/", (req, res, next) => {
    res.json({status: true, message: "RESIDA-V1 health check passed"});
})


    // app.use("error");
}