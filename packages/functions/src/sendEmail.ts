import {SES} from 'aws-sdk';
import {region} from "./constants";

const ses = new SES({region: region});

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

const userEmail = 'delivery@dinenation.com'
export async function sendEmail(params: SendEmailParams): Promise<void> {
  const {to, subject, html} = params;
  const paramsForSendEmail = {
    Source: `DINENATION <${userEmail}>`,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Html: {
          Data: html,
        }
      },
    },
  };

  try {
    await ses.sendEmail(paramsForSendEmail).promise();
    console.log('Email sent successfully', userEmail);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
