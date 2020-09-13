import db from "../database/connection";
import http from 'http-status';
import { Request, Response} from 'express'

export default class SubscriberController{
    
    
    async index(request: Request, response: Response) {

        try {
            const subscribers = await db('subscriber').select();

            return response.status(http.OK).send(subscribers);

        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while finding subscriber'})
        }
    }

    async create(request: Request, response: Response) {
        const { name, email, phone, is_receiver } = request.body;
        
        try {
            const insertedSubscriber = await db('subscriber').insert({
                name, 
                email, 
                phone, 
                is_receiver
            });

            const subs_id = insertedSubscriber[0];

            return response.status(http.CREATED).send()
    
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while creating new subscriber'})
        }
    }

    async alter(request: Request, response: Response) {
        const { name, email, phone, is_receiver } = request.body;
        const id = request.params.id;

        try {
            const info = await db('subscriber').where('id', '=', id).update({
                name, 
                email, 
                phone, 
                is_receiver
            });
            return response.status(http.OK).send()
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while updating subscriber'})
        }
    }
    async delete(request: Request, response: Response) {
        const id = request.params.id;
        
        try {
            const posts = await db('subscriber').where('id', '=', id).delete();
            return response.status(http.OK).send()
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while deleting subscriber'})
        }
    }
}