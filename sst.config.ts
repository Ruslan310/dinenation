import { SSTConfig } from "sst";
import {Api} from "./stacks/Api";
import {Web} from "./stacks/Web";
import {Database} from "./stacks/Database";
// import {AuthStack} from "./stacks/AuthStack";

export default {
  config(_input) {
    return {
      name: "dinenation-postgresql",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app
      .stack(Database)
      // .stack(AuthStack)
      .stack(Api)
      .stack(Web);
  }
} satisfies SSTConfig;
