//require dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs").promises;
const retrieveSecrets = require("./retrieveSecrets");

//basic express app setup
const app = express();
app.use(cors());

//routes to verify that the secrets were retrieved successfully.
app.get("/", (req, res) => {
	return res.status(200).json({
		SECRET_1: process.env.SECRET_1,
		SECRET_2: process.env.SECRET_2,
	});
});

app.listen(4000, async () => {
	try {
		//get secretsString:
		const secretsString = await retrieveSecrets();

		//write to .env file at root level of project:
		await fs.writeFile(".env", secretsString);

		//configure dotenv package
		dotenv.config();

		console.log("Server running on port 4000");
	} catch (error) {
		//log the error and crash the app
		console.log("Error in setting environment variables", error);
		process.exit(-1);
	}
});
