import db from "../database/connection";
import http from 'http-status';
import { Request, Response} from 'express'

const mailer = require('../services/mailer.js');

export default class MessageController{
    
    
    async index(request: Request, response: Response) {

        try {
            const messages = await db('message').select();

            return response.status(http.OK).send(messages);

        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while finding messages'})
        }
    }

    async create(request: Request, response: Response) {
        const { name, email, phone, is_receiver, subject, text } = request.body;
        
        try {
            const insertedSubscriber = await db('subscriber').insert({
                name, 
                email, 
                phone, 
                is_receiver
            });

            const subscriber_id = insertedSubscriber[0];

            const insertedMessage = await db('message').insert({
                subject,
                text,
                subscriber_id
            });

            mailer.sendMail({
                to: process.env.EMAIL_USER,
                from: email,
                subject: 'Lidiane Gouveia - Nova Mensagem Recebida!',
                template: 'new',
                context: { name, subject, text, email, phone},
            }, (error: any) => {
                if (error) {
                    console.log(error);
                    response.status(http.BAD_REQUEST).send({ error: 'Não foi possível enviar o e-mail. Por favor, tente mais tarde.' })
                } else {
                    response.status(http.OK).send({ messagem: `Mensagem enviada! id:${insertedMessage}(${email})`})
                }
            })

            /* const msg_id = insertedMessage[0]; */

            return response.status(http.CREATED).send()
    
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while creating new message'})
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