import db from "../database/connection";
import http from 'http-status';
import { Request, Response,  } from 'express'

export default class CommentsController{
    
    //Busca todos os comentarios de um post
    async indexPostID(request: Request, response: Response) {
        const post_id = request.params.post_id;

        try {
            const comments = await db('comments')
                .select('comments.id', 'subject', 'comment', 'likes', 'created_at', 'subscriber.name' )
                .where('post_id', '=', post_id)
                .rightJoin('subscriber', 'comments.subscriber_id', 'subscriber.id')
                .orderBy('created_at')

            return response.status(http.OK).send(comments);

        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while finding comments'})
        }
    }

    //Cria um novo comentário
    async create(request: any, response: Response) {
        const { post_id, subscriber_id, comment} = request.body;
        
        try {
            const insertedComment = await db('comments').insert({
                subject: comment.subject,
                comment: comment.comment,
                subscriber_id,
                post_id,
            });

            const comment_id = insertedComment[0];

            return response.status(http.CREATED).send({id: comment_id})
    
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while creating new comment'})
        }
    }

    //Incrementa o likes de um comentário
    async like(request: any, response: Response) {
        const id = request.params.id;
        
        try {
            const comment = await db('comments')
                .where('id', '=', id)
                .increment('likes', 1);

            const likes = await db('comments')
                .select('likes')
                .where('id', '=', id)

            console.log(likes);

            return response.status(http.CREATED).send({likes: likes[0].likes})
    
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while creating new comment'})
        }
    }

    //Deleta um comentário
    async delete(request: Request, response: Response) {
        const id = request.params.id;
        
        try {
            const comments = await db('comments').where('id', '=', id).delete();
            return response.status(http.OK).send()
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while deleting comment'})
        }
    }
    
}