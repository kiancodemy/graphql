import jwt from "jsonwebtoken";
export const userresolvers = {
  
  Mutation: {
    signup: async (_, { input }, contextValue) => {
      try {
        const maker = await contextValue.User.create(input);
        return maker;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    logout: async (_, args, contextValue) => {
      await contextValue.outer();
      return true;
    },
    verify: async (_, args, contextValue) => {
      try {
        await contextValue.verfiy();
        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    login: async (_, { input }, contextValue) => {
      try {
        let token;
        const finder = await contextValue.User.findOne({ email: input.email });
        if (!finder) {
          throw new Error("this user is not exist");
        }
        const get = await finder.finding(input.password);
        if (!get) {
          throw new Error("you password is wrong");
        }
        if (finder && get) {
          token = await jwt.sign({ id: finder._id }, process.env.SECRET, {
            expiresIn: "7000d",
          });
        }
        if (token) {
          await contextValue.setter(token);
          return finder;
        }
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};
