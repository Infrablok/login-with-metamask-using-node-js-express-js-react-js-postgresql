import './db';
import cors from 'cors';
import express from 'express';
import { services } from './services';

const app = express();

// middleware for json parsing
app.use(express.json());

// middleware for allow cross origin request
app.use(cors());


app.use('/api', services);

const port = process.env.PORT || 8080;

app.listen(port, () =>
	console.log(`application is running on :${port}`)
);
