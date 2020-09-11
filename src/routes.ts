import express from "express";
import UserController from "./controllers/UserController";
import PostsController from "./controllers/PostsController";
import InfosController from "./controllers/InfoController";
import SubscriberController from "./controllers/SubscriberController";
import MessageController from "./controllers/MessageController";

const routes = express.Router();
const userController = new UserController();
const postsController = new PostsController();
const infosController = new InfosController();
const subscriberController = new SubscriberController();
const messageController = new MessageController();

//Todas para Usuarios
routes.post("/login", userController.login);

//Rotas para Postagens
routes.get("/post", postsController.index);
routes.post("/post", postsController.create);
routes.put("/post/:id", postsController.alter);
routes.delete("/post/:id", postsController.delete);

//Rotas para Infos
routes.get("/infos", infosController.index);
routes.post("/infos", infosController.create);
routes.put("/infos/:id", infosController.alter);
routes.delete("/infos/:id", infosController.delete);

//Rotas para Subscribers
routes.get("/subs", subscriberController.index);
routes.post("/subs", subscriberController.create);
routes.put("/subs/:id", subscriberController.alter);
routes.delete("/subs/:id", subscriberController.delete);

//Rotas para Message
routes.get("/msg", messageController.index);
routes.post("/msg", messageController.create);
routes.put("/msg/:id", messageController.alter);
routes.delete("/msg/:id", messageController.delete);


export default routes;
