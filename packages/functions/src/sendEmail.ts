import {SES} from 'aws-sdk';
import {region} from "./constants";

const ses = new SES({region: region});

interface SendEmailParams {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
  const { to, subject, body } = params;

  const paramsForSendEmail = {
    Source: 'flash310xxx@gmail.com',
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: body,
        },
      },
    },
  };

  try {
    await ses.sendEmail(paramsForSendEmail).promise();
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
