import {ILineItem, ILineItemMetaValue} from "./handle";
import {currency} from "web/src/utils/handle";

interface orderMail {
  comment: string | null | undefined,
  user: string,
  orderNumber: string,
  address: string,
  coupon: string,
  email: string,
  boxes: ILineItem[],
}

export function orderMailToOffice({
                                    comment,
                                    user,
                                    orderNumber,
                                    boxes,
                                    address,
                                    coupon,
                                    email,
}: orderMail): string {
  const commentSection = comment ? `<p>Комментарий к заказу: <strong>${comment}</strong></p>` : '';
  const logoUrl= 'https://bucket-for-user-image.s3.amazonaws.com/bigLogo.png';
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
                  background-color: #f7f7f7;
              }
              .container {
                  width: 100%;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  padding-top: 20px;
                  padding-bottom: 20px;
                  border-radius: 8px 8px 0 0;
                  color: #68696D;
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
                  margin-bottom: 20px;
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
                  border: 1px solid #dddddd;
                  padding: 20px;
              }
              .order_number {
                  color: #e73e14;
              }
              .billing_title {
                  color: #e73e14;
                  margin-top: 20px;
              }
              .footerInfo {
                  text-align: center;
                  padding-top: 20px;
                  font-size: 14px;
                  color: #666666;
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
          </style>
      </head>
      <body>
      <div class="container">
          <div class="content">
              <img src="${logoUrl}" alt="logo" />
              <div class="header">
                  <h1>New Order: #${orderNumber}</h1>
              </div>
              <div class="block">
                  <p>You’ve received the following order from <span class="upper_text">${user}</span>:</p>
                  <h3 class="order_number">[Order #${orderNumber}] (${new Date().toLocaleDateString('en-GB')})</h3>
                  <table>
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
                  </table>
                  <h3 class="billing_title">Billing address</h3>
                  <div class="footer">
                    <p class="upper_text">${user}</p> 
                    <p class="upper_text">${coupon}</p> 
                    <p class="cursive_text">${address}</p> 
                    <a class="cursive_text" href="mailto:${email}">${email}</a>
                  </div> 
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
