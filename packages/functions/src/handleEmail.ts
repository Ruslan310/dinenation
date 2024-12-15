import {logoUrl, siteUrl} from "./constants";

interface orderMail {
  user: string,
}

export function handleEmail({user}: orderMail): string {
  return `
    <!DOCTYPE html>
      <html lang="ru">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  padding: 0;
                  font-family: Arial, sans-serif;
                  margin: 0 auto;
              }
              .container {
                  width: 100%;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .content {
                  margin: 0 auto;
                  width: 600px;
                  border-radius: 8px;
                  font-size: 14px;
                  color: #636363;
              }
              .img_block {
                  width: 500px;
                  margin: 0 auto 20px;
              }
              .img_block img {
                  width: 100%;
                  height: auto;
              }
              .header {
                  background-color: #e73e14;
                  text-align: center;
                  padding-top: 20px;
                  padding-bottom: 20px;
                  border-radius: 8px 8px 0 0;
                  margin-top: 30px;
              }
              .header h1 {
                  color: #ffffff;
                  font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;
                  font-size: 30px;
                  font-weight: 300;
              }
              .block {
                  border: 1px solid #e73e14;
                  padding: 35px 60px;
                  border-radius: 0 0 8px 8px;
              }
              .footerInfo {
                  text-align: center;
                  padding-top: 20px;
                  font-size: 14px;
                  color: #CBCBCB;
              }
              a.weekly_menu {
                  color: #e73e14;
                  text-decoration: underline;
              }
              .text_block {
                  margin: 20px 0;
              }
              .text_block p {
                  margin: 0;
              }
          </style>
      </head>
      <body>
      <div class="container">
          <div class="content">
              <div class="img_block">
                <img src="${logoUrl}" alt="logo" />
              </div>
              <div class="header">
                  <h1>Don't forget to place your order</h1>
              </div>
              <div class="block">              
                <p>Hi ${user},</p>
                
                <div class="text_block">
                  <p>This is a kind reminder from Dine Nation.</p>
                  <p>Please don’t forget to place your order.</p>
                </div>
                
                <div class="text_block">
                  <p>Proceed to:</p>
                  <a class="weekly_menu" href="${siteUrl}">Weekly Menu</a>
                </div>
              </div>
          </div>
          <div class="footerInfo">
              <p>© COPYRIGHT 2024 – DINENATION LTD</p>
          </div>
      </div>
    </body>
  </html>
`;
}
