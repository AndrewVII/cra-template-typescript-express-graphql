import '../config/config';
import debug from 'debug';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import http from 'http';
import { URL } from 'url';
import { graphqlHTTP } from 'express-graphql';

import { connectToDb, disconnectDb } from './db/conn';
import {schema} from './schema/schema';

const log = debug('tbg:routes:index');

const __dirname = new URL('.', import.meta.url).pathname;

// create connection to mongodb
connectToDb();

const app = express();
const httpServer = http.createServer(app);

app.enable('trust proxy');
app.set('trust proxy', 1);
app.use(compression());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static('dist'));
app.use('*/js', express.static('dist'));
app.use('*/txt', express.static('dist'));


// Setting up graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

const cleanUp = (signalType: string) => {
  log('received signal', signalType);
  disconnectDb();
  process.exit(0);
};

const port = process.env.PORT || 8000;

process
  .on('unhandledRejection', (reason, p) => {
    // eslint-disable-next-line
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    // eslint-disable-next-line
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

httpServer.listen(port, () => {
  log('listening on port', port);

  ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'].forEach((signalType) => {
    process.on(signalType, cleanUp.bind(null, signalType));
  });
});