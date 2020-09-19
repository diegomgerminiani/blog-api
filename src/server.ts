import express from 'express';
import cors from 'cors';
import routes from './routes';
import './env'

const app = express();
const port = process.env.PORT || 3001;

app.disable('etag');

app.use(cors())
app.use(express.json());
app.use(routes);


app.listen(port, () => {
    /* console.log(`Servidor executando em: http://localhost:${port}/`); */
});