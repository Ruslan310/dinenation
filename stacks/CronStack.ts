import {Cron, StackContext, use} from "sst/constructs";
import {Database} from "./Database";

export function CronStack({ stack }: StackContext) {

  // new Cron(stack, "FridayAndSaturdayJob", {
  //   schedule: "cron(0 12 ? * 6,7 *)", // Запуск в 12:00 (UTC) по пятницам (6) и субботам (7)
  //   job: {
  //     function: {
  //       handler: "packages/functions/src/cronTasks.handler",
  //     },
  //   },
  // });

  // console.log('---time', new Date().toISOString())

  new Cron(stack, "FridayAndSaturdayJob", {
    // schedule: "rate(3 minutes)",
    // schedule: "cron(0 12 ? * 6,7 *)", // Запуск в 12:00 (UTC) по пятницам (6) и субботам (7)
    schedule: "cron(10 14 ? * 1,6 *)", // Запуск в 17:00 (UTC) по пятницам (6) и субботам (7)
    job: {
      function: {
        timeout: 900,
        handler: "packages/functions/src/cronSendEmail.handler",
        bind: [use(Database)],
      },
    },
  });

  stack.addOutputs({
    sendMessage: "Task scheduled for Fridays and Saturdays at 15:00 UTC",
  });
}
