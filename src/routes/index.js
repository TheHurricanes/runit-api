import { Router as expressRouter } from "express";
import { identify } from "../controllers/identify";
import { compile } from "../controllers/compile";
import { failureResponse } from "../utils/http-responses";
import { addCode, getUserSnippets, updateSnippet } from "../controllers/code";
import { signup, signin, getUser } from "../controllers/user";

const router = expressRouter();

router.get("/", (req, res) => failureResponse({ res }));

/* Indentify programming language */
router.post("/identify", identify);

/* Compile snippet */
router.post("/compile", compile);

/* Add user code snippet */
router.post("/code", addCode);

/* Get all snippets from a user */
router.get("/user/snippets", getUserSnippets);

/* Update an excisting snippet */
router.get("/code/update", updateSnippet);

/* Add a new user */
router.post("/signup", signup);

router.post("/signin", signin);

router.get("/user/get", getUser);

router.use((req, res) => {
	failureResponse({ res });
});

export default router;
