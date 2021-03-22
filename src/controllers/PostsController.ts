import db from "../database/connection";
import http from 'http-status';
import { Request, Response,  } from 'express'

interface tagItem{
    post_id: number;
    name: string;
    color: string;
}

export default class PostsController{
    
    //Busca todos os posts
    async index(request: Request, response: Response) {

        try {
            const posts = await db('posts').select();

            return response.status(http.OK).send(posts);

        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while finding posts'})
        }
    }

    //Busca todos os posts ativos
    async indexActivated(request: Request, response: Response) {

        try {
            const posts = await db('posts')
                .where('is_activated', '=', '1')
                .orderBy([{ column: 'created_at', order: 'desc'}, { column: 'is_highlight', order: 'desc'}])
                .select();

            const posts_response = await Promise.all(
                posts.map(async (post: any) => {
                    const comments = await db('comments')
                        .select('comments.id', 'subject', 'comment', 'likes', 'created_at', 'subscriber.name' )
                        .where('post_id', '=', post.id)
                        .rightJoin('subscriber', 'comments.subscriber_id', 'subscriber.id')
                        .orderBy('created_at');

                    return {...post, comments}
                })
            );

            return response.status(http.OK).send(posts_response);

        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while finding posts'})
        }
    }

    //Busca os 3 posts ativos mais recentes 
    async indexSpotlight(request: Request, response: Response) {

        try {
            const posts = await db('posts')
                .where('is_activated', '=', '1')
                .limit(3)
                .orderBy('created_at', 'desc')
                .select('id', 'img', 'title', 'created_at');

            return response.status(http.OK).send(posts);

        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while finding posts'})
        }
    }

    //Cria um novo post
    async create(request: any, response: Response) {
        const { title, subtitle, text, is_highlight, is_activated} = request.body;
        const { location } = request.file;
        
        try {
            const insertedPost = await db('posts').insert({
                title,
                subtitle,
                text,
                img: location, 
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

    //Atualiza um post
    async alter(request: Request, response: Response) {
        const { title, subtitle, text, is_highlight, is_activated} = request.body;
        const { path } = request.file;
        const id = request.params.id;

        try {
            const posts = await db('posts').where('id', '=', id).update({
                title,
                subtitle,
                text,
                img: path, 
                is_highlight, 
                is_activated
            });
            return response.status(http.OK).send()
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while updating post'})
        }
    }

    //Deleta um post
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