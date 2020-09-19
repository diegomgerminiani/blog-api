import db from "../database/connection";
import http from 'http-status';
import bcrypt from 'bcryptjs';
import { JWT, JWK } from 'jose';
import { Request, Response } from 'express';

interface User {
    id: number;
    name: string;
    password: string;
    token: string;
  }

export default class UserControllers {
    async login(request: Request, response: Response) {
        const { name, password } = request.body;
        
        const user = await db('user')
            .from<User>('user')
            .where({name})
            .select();
        if(!user){
            return response.status(http.NOT_FOUND).send();
        }

        if(bcrypt.compareSync(password, user[0].password)){
            const newToken = JWT.sign({
                id: user[0].id,
                name: user[0].name
            }, JWK.asKey(process.env.DEFAULT_KEY as string), { expiresIn: '1 hour' });
            user[0].token = newToken;
        }

        return response.status(http.OK).send({name: user[0].name, token: user[0].token});
    }
}