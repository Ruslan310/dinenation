import {sendEmail} from "./sendEmail";
import {handleEmail} from "./handleEmail";
import {getUsersWithoutProcessingOrders} from "@dinenation-postgresql/core/orders";
import {URLSearchParams} from "url";
import axios from "axios";
import {botApi, telegramToken} from "./constants";

const chatIdIndividual = 658137109;

export async function handler(): Promise<void> {
  console.log('------start')
  const delay = 100;
  const subject = `Don't forget to place your order`;
  const emailsList = await getUsersWithoutProcessingOrders();
  const uniqueData = Array.from(new Map(emailsList.map(item => [item.email, item])).values());

  // const message = JSON.stringify(emailsList.map(email => email.email))
  // const params = new URLSearchParams({chat_id: chatIdIndividual.toString(), text: message})
  // await axios(`${botApi}${telegramToken}/sendMessage?${params}`)

  console.log('------emailsList', uniqueData)

  for (const { email, first_name } of uniqueData) {
    await sendEmail({
      to: email,
      subject,
      html: handleEmail({user: first_name}),
    })
    // console.log(`Email sent to: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

}
