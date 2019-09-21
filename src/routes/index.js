import { Router as expressRouter } from "express";
import { identify } from "../controllers/identify";
import { compile } from "../controllers/compile";
import { failureResponse } from "../utils/http-responses";
import {
	addCode,
	getUserSnippets,
	updateSnippet,
	remove
} from "../controllers/code";
import { signup, signin, getUser, updateUser } from "../controllers/user";

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
router.post("/code/update", updateSnippet);
router.post("/code/remove", remove);

/* User related API endpoints */
router.post("/signup", signup);

router.post("/signin", signin);

router.get("/user/info", getUser);

router.post("/user/update", updateUser);

router.post("/upload");

router.use((req, res) => {
	failureResponse({ res });
});

export default router;
