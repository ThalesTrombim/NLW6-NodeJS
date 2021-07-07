import { Router } from "express";
import { CreateTagController } from "./src/controllers/CreateTagController";
import { CreateUserController } from "./src/controllers/CreateUserController";
import { ensureAuthenticated } from "./src/middlewares/ensureAuthenticated";
import { ensureAdmin } from './src/middlewares/ensureAdmin';
import { AuthenticateUserController } from './src/controllers/AuthenticateUserController';
import { CreateComplimentController } from './src/controllers/CreateComplimentController';
import { ListUserReceiveComplimentsController } from './src/controllers/ListUserReceiveComplimentsController';
import { ListUserSendComplimentsController } from './src/controllers/ListUserSendComplimentsController';
import { ListTagController } from './src/controllers/ListTagController';
import { ListUserController } from './src/controllers/ListUsersController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagController = new ListTagController();
const listUserController = new ListUserController();

router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle)
router.post("/users", createUserController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/compliments", ensureAuthenticated, createComplimentController.handle)

router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle)

router.get("/tags", listTagController.handle)
router.get("/users", ensureAuthenticated, listUserController.handle)

export { router };