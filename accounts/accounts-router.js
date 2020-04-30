const express = require("express")

const db = require("../data/dbConfig.js")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		// SELECT * FROM "accounts"
		const accounts = await db("accounts")
		res.json(accounts)
	} catch (err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const payload = {
			name: req.body.name,
			budget: req.body.budget
		}

		// translates to `INSERT INTO "accounts" ("name", "budget") Values (?, ?);`
		const [id] = await db("accounts").insert(payload)
		const account = await db("accounts").where("id", id).first()
		res.json(account)

	} catch (err) {
		next(err)
	}
})

// PUT

// DELETE

module.exports = router