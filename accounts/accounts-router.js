const express = require("express")

const db = require("../data/dbConfig.js")

const router = express.Router()

// GET
router.get("/", async (req, res, next) => {
	try {
		// SELECT * FROM "accounts"
		const accounts = await db("accounts")
		res.json(accounts)
	} catch (err) {
		next(err)
	}
})

// POST
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
router.put("/:id", async (req, res, next) => {
	try {
		
		const payload = {
			name: req.body.name,
			budget: req.body.budget
		}

		// translates to `UPDATE "accounts" SET name="?" budget="?" WHERE id=req.params.id`
		await db("accounts").where("id", req.params.id).update(payload)
		res.status(204).json(updatedAcc)

	} catch (err) {
		next(err)
	}
})

// DELETE
router.delete("/:id", async (req, res, next) => {

	// translates to `DELETE FROM "accounts' WHERE id=req.params.id`
	await db("accounts").where("id", req.params.id).del();
	const deletedAcc = await db("accounts").where("id", req.params.id)
	res.json(deletedAcc)
})

module.exports = router