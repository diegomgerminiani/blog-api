import db from "../database/connection";
import http from 'http-status';
import { Request, Response} from 'express'

export default class MessageController{
    
    
    async index(request: Request, response: Response) {

        try {
            const messages = await db('message').select();

            return response.status(http.OK).json(messages);

        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while finding messages'})
        }
    }

    async create(request: Request, response: Response) {
        const { subject, text, subscriber_id } = request.body;
        
        try {
            const insertedMessage = await db('message').insert({
                subject,
                text,
                subscriber_id
            });

            const msg_id = insertedMessage[0];

            return response.status(http.CREATED).send({id: msg_id})
    
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while creating new message'})
        }
    }

    async alter(request: Request, response: Response) {
        const { subject, text, subscriber_id } = request.body;
        const id = request.params.id;

        try {
            const message = await db('message').where('id', '=', id).update({
                subject,
                text,
                subscriber_id
            });
            return response.status(http.OK).send()
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while updating message'})
        }
    }
    async delete(request: Request, response: Response) {
        const id = request.params.id;
        
        try {
            const message = await db('message').where('id', '=', id).delete();
            return response.status(http.OK).send()
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while deleting message'})
        }
    }
}