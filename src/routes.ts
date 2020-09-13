import express from "express";
import Authorization from './middleware/Authorization';

import UserController from "./controllers/UserController";
import PostsController from "./controllers/PostsController";
import InfosController from "./controllers/InfoController";
import SubscriberController from "./controllers/SubscriberController";
import MessageController from "./controllers/MessageController";

const routes = express.Router();
const authorization = new Authorization();
const userController = new UserController();
const postsController = new PostsController();
const infosController = new InfosController();
const subscriberController = new SubscriberController();
const messageController = new MessageController();

//Todas para Usuarios
routes.post("/login", userController.login);

//Rotas para Postagens
routes.get("/post", postsController.index);
routes.post("/post", authorization.global, postsController.create);
routes.put("/post/:id", authorization.global, postsController.alter);
routes.delete("/post/:id", authorization.global, postsController.delete);

//Rotas para Infos
routes.get("/infos", infosController.index);
routes.post("/infos", authorization.global, infosController.create);
routes.put("/infos/:id", authorization.global, infosController.alter);
routes.delete("/infos/:id", authorization.global, infosController.delete);

//Rotas para Subscribers
routes.get("/subs", authorization.global, subscriberController.index);
routes.post("/subs", subscriberController.create);
routes.put("/subs/:id", authorization.global, subscriberController.alter);
routes.delete("/subs/:id", authorization.global, subscriberController.delete);

//Rotas para Message
routes.get("/msg", authorization.global, messageController.index);
routes.post("/msg", messageController.create);
routes.put("/msg/:id", authorization.global, messageController.alter);
routes.delete("/msg/:id", authorization.global, messageController.delete);


export default routes;
