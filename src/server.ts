import express from 'express';
import cors from 'cors';
import routes from './routes';
import Authorization from './middleware/Authorization';
import './env';

const authorization = new Authorization();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(authorization.global);
app.use(routes);


app.listen(port, () => {
    console.log(`Servidor executando em: http://localhost:${port}/`);
});