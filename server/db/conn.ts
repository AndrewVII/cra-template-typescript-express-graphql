import debug from 'debug';
import mongoose from 'mongoose';
import '../../config/config.ts';

const log = debug('tbg:util:db');
const logError = debug('tbg:util:db:error');
const URI = process.env.DB_URI!;

export function connectToDb() {
  mongoose.connect(URI);

  mongoose.connection.on('error', err => {
    logError(err);
  });

  mongoose.connection.once('open', () => {
    log('successful connection to mongodb');
  });
}

export function disconnectDb() {
  log('disconnecting mongoose');
  mongoose.disconnect();
}
