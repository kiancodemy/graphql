import { mergeTypeDefs } from "@graphql-tools/merge";
import { transtypeDefs } from "./trans.js";
import { usertypeDefs } from "./user.js";
const mergedTypeDefs = mergeTypeDefs([transtypeDefs, usertypeDefs]);

export default mergedTypeDefs;
