import mongoose from 'mongoose';

const schema = {
  name: String,
  meat: String,
  sauce: String,
  bread: String,
};

const compiledSchema = new mongoose.Schema(
  schema,
  {
    collection: 'sandwiches',
    autoIndex: true,
    strict: true,
    timestamps: true,
  },
);

export default {
  model: mongoose.model('Sandwich', compiledSchema),
};
