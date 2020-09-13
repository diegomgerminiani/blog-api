import status from 'http-status';
import { JWT, JWK } from 'jose';
import { Request, Response, NextFunction} from 'express';

export default class MessageController{
    
    async global(request: Request, response: Response, next: NextFunction) {
                  
        const auth = request.headers.authorization;

        //Verifica se existe uma autorização no header
        if (!auth)
            return response.status(status.UNAUTHORIZED).send({ erro: 'Nenhum token foi passado.' });

        const parts = auth.split(' ');

        //Verifica se o token possui duas partes
        if (parts.length !== 2)
            return response.status(status.UNAUTHORIZED).send({ erro: 'Token quebrado.' });

        const [prefix, token] = parts;

        //Verifica se o token possui o prefixo Bearer
        if(!/^Bearer$/i.test(prefix))
            return response.status(status.UNAUTHORIZED).send({ erro: 'Erro no formato do token.'});

        try {
            let decoded = JWT.verify(token, JWK.asKey(process.env.DEFAULT_KEY as string));
            return next();
        } catch (error) {
            return response.status(status.UNAUTHORIZED).send({ error: 'Token Invalido!' });
        }
    }
}
