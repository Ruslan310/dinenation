import { StackContext, Cognito } from "sst/constructs";

export function AuthStack({ stack }: StackContext) {
  // Создаем Cognito User Pool
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  });

  // Экспортируем значения
  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });

  return auth;
}
