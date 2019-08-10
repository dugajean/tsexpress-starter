import express from 'express';
import BodyParser from 'body-parser';
import Application from './core/application';

const server = express();

server.use(BodyParser.urlencoded({ extended: true }));
server.use(BodyParser.json());

const app = new Application(server);

app.start();
