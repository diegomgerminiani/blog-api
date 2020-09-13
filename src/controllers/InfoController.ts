import db from "../database/connection";
import http from 'http-status';
import { Request, Response} from 'express';

export default class InfoController{
    
    
    async index(request: Request, response: Response) {

        try {
            const infos = await db('informations').select();

            return response.status(http.OK).json(infos);

        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while finding informations'})
        }
    }

    async create(request: Request, response: Response) {
        const { name, street, complement, number, neighborhood, cep, city_uf, phone, email } = request.body;
        
        try {
            const insertedInfos = await db('informations').insert({
                name,
                street,
                complement,
                number, 
                neighborhood,
                cep,
                city_uf,
                phone,
                email
            });

            const info_id = insertedInfos[0];

            return response.status(http.CREATED).send({id: info_id})
    
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while creating new informations'})
        }
    }

    async alter(request: Request, response: Response) {
        const { name, street, complement, number, neighborhood, cep, city_uf, phone, email } = request.body;
        const id = request.params.id;

        try {
            const info = await db('informations').where('id', '=', id).update({
                name,
                street,
                complement,
                number, 
                neighborhood,
                cep,
                city_uf,
                phone,
                email
            });
            return response.status(http.OK).send()
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while updating informations'})
        }
    }
    async delete(request: Request, response: Response) {
        const id = request.params.id;
        
        try {
            const posts = await db('informations').where('id', '=', id).delete();
            return response.status(http.OK).send()
        } catch (error) {
            console.log(`error: ${error}`);
            return response.status(http.BAD_REQUEST).send({error: 'Unexpected error while deleting informations'})
        }
    }
}