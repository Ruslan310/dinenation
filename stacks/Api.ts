import {use, StackContext, Api as ApiGateway} from "sst/constructs";
import {Database} from "./Database";
import {AuthStack} from "./AuthStack";

export function Api({ stack }: StackContext) {
  // const auth = use(AuthStack);

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        bind: [use(Database)],
        // environment: {
        //   USER_POOL_ID: auth.userPoolId,
        //   USER_POOL_CLIENT_ID: auth.userPoolClientId,
        // },
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
      "POST /dishImage": "packages/functions/src/dishImage.main",
      "POST /reviewImages": "packages/functions/src/reviewImages.main",
      "POST /userImage": "packages/functions/src/userImage.main",
      "GET /listImages": "packages/functions/src/listImages.main",
      "POST /send-email": "packages/functions/src/sendEmail.handler",
    },
  });

  stack.addOutputs({
    API: api.url,
  });

  return api;
}
