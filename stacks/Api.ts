import {use, StackContext, Api as ApiGateway} from "sst/constructs";
import {Database} from "./Database";
import {AuthStack} from "./AuthStack";

export function Api({ stack }: StackContext) {
  const auth = use(AuthStack); // Убедитесь, что AuthStack используется здесь

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        bind: [use(Database)],
        environment: {
          USER_POOL_ID: auth.userPoolId,
          USER_POOL_CLIENT_ID: auth.userPoolClientId,
        },
      },
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: {
          handler: "packages/functions/src/graphql/graphql.handler",
        },
        pothos: {
          schema: "packages/functions/src/graphql/schema.ts",
          output: "packages/graphql/schema.graphql",
          commands: [
            "cd packages/graphql && npx @genql/cli --output ./genql --schema ./schema.graphql --esm",
          ],
        },
      },
      "POST /image": "packages/functions/src/productImage.main",
    },
  });

  stack.addOutputs({
    API: api.url,
  });

  return api;
}
