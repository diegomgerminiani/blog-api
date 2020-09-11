import db from "../database/connection";
import http from 'http-status';
import { Request, Response} from 'express'

interface tagItem{
    post_id: number;
    name: string;
    color: string;
}

export default class PostsController{
    
    
    async index(request: Request, response: Response) {

        try {
            const posts = await db('posts').select();

            return response.status(http.OK).json(posts);

        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while finding posts'})
        }
    }

    async create(request: Request, response: Response) {
        const { title, subtitle, text, img, is_highlight, is_activated, tags} = request.body;
        
        try {
            const insertedPost = await db('posts').insert({
                title,
                subtitle,
                text,
                img, 
                is_highlight, 
                is_activated
            });

            const post_id = insertedPost[0];

            return response.status(http.CREATED).send({id: post_id})
    
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while creating new post'})
        }
    }

    async alter(request: Request, response: Response) {
        const { title, subtitle, text, img, is_highlight, is_activated, tags} = request.body;
        const id = request.params.id;

        try {
            const posts = await db('posts').where('id', '=', id).update({
                title,
                subtitle,
                text,
                img, 
                is_highlight, 
                is_activated
            });
            return response.status(http.OK).send()
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while updating post'})
        }
    }
    async delete(request: Request, response: Response) {
        const id = request.params.id;
        
        try {
            const posts = await db('posts').where('id', '=', id).delete();
            return response.status(http.OK).send()
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while deleting post'})
        }
    }
}