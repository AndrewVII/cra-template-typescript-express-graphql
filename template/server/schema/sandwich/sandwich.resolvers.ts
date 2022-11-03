import db from '../../models';

export default {
  Query: {
    sandwiches: async () => db.Sandwich.model.find({}),
    sandwich: (parent: any, args: any) => {
      const { name } = args;
      return db.Sandwich.model.findOne({ name });
    },
  },
  Mutation: {
    createSandwich: async (root: any, args: any) => {
      const { input } = args;
      const newSandwich = await db.Sandwich.model.create(input);
      return newSandwich;
    },
    updateSandwich: async (root: any, args: any) => {
      const { id, input } = args;
      const updatedSandwich = await db.Sandwich.model.findOneAndUpdate({ id }, input);
      return updatedSandwich;
    },
  },
};
