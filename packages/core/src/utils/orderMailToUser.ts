import {ILineItem, ILineItemMetaValue} from "./handle";
import {currency} from "web/src/utils/handle";

interface orderMail {
  comment: string | null | undefined,
  user: string,
  orderNumber: string,
  hidePrice: boolean,
  address: string,
  coupon: string,
  email: string,
  orderId: number,
  boxes: ILineItem[],
}

export function orderMailToUser({comment, user, orderNumber, boxes, hidePrice, coupon, address, email, orderId}: orderMail): string {
  const commentSection = comment ? `<p>Комментарий к заказу: <strong>${comment}</strong></p>` : '';
  const logoUrl= 'https://bucket-for-user-image.s3.amazonaws.com/bigLogo.png';
  const siteUrl= 'https://d3i1i49mr0zzjl.cloudfront.net/';
  let currentPride = 0
  const rows = boxes
    .map(item => {
      currentPride += item.price
      const metaDataString = item.meta_data
        .filter(meta => meta.value)
        .map(meta => {
          if (Array.isArray(meta.value)) {
            // Если value это массив, обрабатываем каждый элемент
            return (meta.value as ILineItemMetaValue[])
              .map(valueItem =>
                `<strong>${valueItem.section_label}:</strong> ${valueItem.value} ${valueItem.price ? currency(valueItem.price) : ''}`)
              .join('\n\n');
          } else {
            return `<strong>${meta.key}:</strong> ${meta.value}`;
          }
        })
        .join('\n\n');

      return `
      <tr>
        <td>
          <div style="white-space: pre-line;">
            ${item.name}\n\n${metaDataString}
          </div>
        </td>
        <td>${item.quantity}</td>
        <td>${currency(item.price)}</td>
      </tr>
    `;
    })
    .join('');

  const userTable = !hidePrice ?
    `<table>
                      <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${rows}
                        <tr>
                            <td colspan="2">Shipping:</td>
                            <td>Free shipping</td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>Total:</strong></td>
                            <td>${currency(currentPride)} <small>(includes ${currency(currentPride * 0.05)} VAT (5%))</small></td>
                        </tr>
                      </tbody>
                  </table>`
    : '';

  const emailHtml = `
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
                  /*background-color: #f7f7f7;*/
              }
              .container {
                  width: 100%;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background-color: #e73e14;
                  text-align: center;
                  padding-top: 20px;
                  padding-bottom: 20px;
                  border-radius: 8px 8px 0 0;
                  color: #ffffff;
                  margin-top: 30px;
              }
              .content {
                  margin: 0 auto;
                  width: 600px;
                  border-radius: 8px;
                  font-size: 14px;
                  color: #636363;
              }
              .content img {
                  width: 600px;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
              }
              table, th, td {
                  border: 1px solid #dddddd;
              }
              th, td {
                  padding: 8px;
                  text-align: left;
              }
              th {
                  background-color: #f4f4f4;
              }
              .block {
                  border: 1px solid #e73e14;
                  padding: 20px;
                  border-radius: 0 0 8px 8px;
              }
              .order_number {
                  color: #e73e14 !important;
              }
              .footerInfo {
                  text-align: center;
                  padding-top: 20px;
                  font-size: 14px;
                  color: #666666;
              }
              .billing_title {
                  color: #e73e14;
                  margin-top: 20px;
              }
              .footer {
                  margin-top: 10px;
                  border: 1px solid #dddddd;
                  padding: 10px;
                  font-size: 14px;
              }
              .upper_text {
                  text-transform: uppercase;
              }
              .cursive_text {
                  font-style: italic;
              }
              .link_title {
                  font-weight: bold;
                  margin-top: 30px;
              }
          </style>
      </head>
      <body>
      <div class="container">
          <div class="content">
              <img src="${logoUrl}" alt="logo" />
              <div class="header">
                  <h1>Thank you for your order</h1>
              </div>
              <div class="block">
                  <p class="user">Hi ${user},</p>
                  <p>Just to let you know — we've received your order <strong>#${orderNumber}</strong>, and it is now being processed:</p>
                  <h3 class="order_number">[Order #${orderNumber}] (${new Date().toLocaleDateString('en-GB')})</h3>
                  ${userTable}
                  <h3 class="billing_title">Billing address</h3>
                  <div class="footer">
                    <p class="upper_text">${user}</p> 
                    <p class="upper_text">${coupon}</p> 
                    <p class="cursive_text">${address}</p> 
                    <a class="cursive_text" href="mailto:${email}">${email}</a>
                  </div>
                  <p class="link_title">Want to cancel this order?</p>
                  <a class="order_number" href="${siteUrl}history/${orderId}">Cancel Order</a>
                  <p>Thanks for using <a href=  "${siteUrl}">dinenation.com</a>!</p>
              </div>
          </div>
          <div class="footerInfo">
              <p>© 2024 DINENATION. Thank you for your order!</p>
          </div>
      </div>
    </body>
  </html>
`;

  return emailHtml;
}
