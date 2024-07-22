import { mergeResolvers } from "@graphql-tools/merge";
import { userresolvers } from "./user.js";
import { transresolvers } from "./tansresolver.js";
const mergedResolvers = mergeResolvers([userresolvers, transresolvers]);

export default mergedResolvers;
