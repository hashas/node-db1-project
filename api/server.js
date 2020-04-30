const express = require("express");
// import router
const accountsRouter = require("../accounts/accounts-router.js")

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use("/accounts", accountsRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server;
