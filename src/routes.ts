import express from "express";
import './env';

import Authorization from './middleware/Authorization';
const upload = require('./middleware/UploadImage.js');

import UserController from "./controllers/UserController";
import PostsController from "./controllers/PostsController";
import CommentsController from "./controllers/CommentsController";
import InfosController from "./controllers/InfoController";
import SubscriberController from "./controllers/SubscriberController";
import MessageController from "./controllers/MessageController";

const routes = express.Router();
const authorization = new Authorization();
const userController = new UserController();
const postsController = new PostsController();
const commentsController = new CommentsController();
const infosController = new InfosController();
const subscriberController = new SubscriberController();
const messageController = new MessageController();

//Todas para Usuarios
routes.post("/login", userController.login);

//Rotas para Postagens
routes.get("/post", postsController.indexActivated);
routes.get("/post_spotlight", postsController.indexSpotlight);
routes.get("/post_all", authorization.global, postsController.index);
routes.post("/post", authorization.global, upload.singleImage, postsController.create); 
routes.put("/post/:id", authorization.global, upload.singleImage, postsController.alter);
routes.delete("/post/:id", authorization.global, postsController.delete);

//Rotas para Postagens
routes.get("/comment/:post_id", commentsController.indexPostID);
routes.post("/comment", commentsController.create);
routes.put("/comment/like/:id", commentsController.like);
routes.delete("/comment", authorization.global, commentsController.delete);

//Rotas para Infos
routes.get("/infos", infosController.index);
routes.post("/info/newAccess", infosController.newAccess);
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
routes.delete("/msg/:id", authorization.global, messageController.delete);


export default routes;
