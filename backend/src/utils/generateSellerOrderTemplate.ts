import mjml2html from 'mjml';
import { OrderEmailTemplateData } from './emailTemplates';
export const generateOrderEmailForSellerTemplate = (order: OrderEmailTemplateData) => {
  const itemsRows = order.items
    .map(
      (item) => `
        <tr style="border-bottom:1px solid #ccc;">
          <td>
            ${item.quantity} x ${item.product.name}<br/>
            <small>Color: ${item.color} | Talle: ${item.size}</small>
          </td>
          <td align="right">$${(item.unitPrice * item.quantity).toFixed(2)}</td>
        </tr>
      `
    ).join('');

  const couponHtml = order.couponDiscount?.applied
    ? `
    <tr>
      <td>Descuento cupón (${order.couponDiscount.type === 'percentage'
        ? `${order.couponDiscount.value}%`
        : `$${order.couponDiscount.amount}`
      })</td>
      <td align="right">- $${order.couponDiscount.amount.toFixed(2)}</td>
    </tr>`
    : '';

  const direccion = `${order.address.calle}, ${order.address.localidad}, ${order.address.provincia}, CP ${order.address.postalCode}`;

  const metodoEnvio = order.shippingMethod === 'domicilio'
    ? `Domicilio: ${direccion}`
    : `Sucursal del Correo: ${direccion}`;

  const mjml = `
<mjml>
  <mj-head>
    <mj-title>Nueva orden pagada - Punky Pet</mj-title>
    <mj-preview>Orden ${order.orderNumber} de ${order.user.name}</mj-preview>
  </mj-head>
  <mj-body background-color="#f4f4f4">
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" font-weight="bold">🧾 Nueva orden pagada</mj-text>
        <mj-text>
          <strong>Cliente:</strong> ${order.user.name || 'No especificado'} (${order.user.email})<br/>
          <strong>Orden:</strong> ${order.orderNumber}
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="24px" border-radius="8px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold">🛍️ Productos</mj-text>
        <mj-table cellpadding="6">
          <tr style="border-bottom:1px solid #ccc;">
            <th align="left">Producto</th>
            <th align="right">Subtotal</th>
          </tr>
          ${itemsRows}
          ${couponHtml}
          <tr style="border-top:1px solid #ccc;">
            <td><strong>Total</strong></td>
            <td align="right"><strong>$${order.totalAmount.toFixed(2)}</strong></td>
          </tr>
        </mj-table>

        <mj-divider border-color="#ddd" padding="16px 0"/>

        <mj-text font-size="16px" font-weight="bold">📦 Enviar a:</mj-text>
        <mj-text>${metodoEnvio}</mj-text>

        <mj-divider border-color="#ddd" padding="16px 0"/>

        <mj-text font-size="12px" color="#999999">
          Este mensaje fue generado automáticamente por el sistema de Punky Pet.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

  return mjml2html(mjml).html;
};


export const generateTransferEmailForSellerTemplate = (order: OrderEmailTemplateData) => {
  const itemsRows = order.items
    .map(item => `
      <tr style="border-bottom:1px solid #ccc;">
        <td>
          ${item.quantity} x ${item.product.name}<br/>
          <small>Color: ${item.color} | Talle: ${item.size}</small>
        </td>
        <td align="right">$${(item.unitPrice * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

  const transferHtml = order.transferDiscount?.applied
    ? `
    <tr>
      <td>Descuento Transferencia (${order.transferDiscount.percentage}%)</td>
      <td align="right">- $${order.transferDiscount.value.toFixed(2)}</td>
    </tr>` : '';

  const couponHtml = order.couponDiscount?.applied
    ? `
    <tr>
      <td>Descuento Cupón (${order.couponDiscount.type === 'percentage'
        ? `${order.couponDiscount.value}%`
        : `$${order.couponDiscount.amount}`})</td>
      <td align="right">- $${order.couponDiscount.amount.toFixed(2)}</td>
    </tr>` : '';

  const direccion = `${order.address.calle}, ${order.address.localidad}, ${order.address.provincia}, CP ${order.address.postalCode}`;
  const metodoEnvio = order.shippingMethod === 'domicilio'
    ? `Domicilio: ${direccion}`
    : `Sucursal del Correo: ${direccion}`;

  const mjml = `
<mjml>
  <mj-head>
    <mj-title>Orden con transferencia - Punky Pet</mj-title>
    <mj-preview>Orden ${order.orderNumber} de ${order.user.name}</mj-preview>
  </mj-head>
  <mj-body background-color="#f4f4f4">
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" font-weight="bold">🧾 Nueva orden con transferencia</mj-text>
        <mj-text>
          <strong>Cliente:</strong> ${order.user.name || 'No especificado'} (${order.user.email})<br/>
          <strong>Orden:</strong> ${order.orderNumber}
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="24px" border-radius="8px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold">🛍️ Productos</mj-text>
        <mj-table cellpadding="6">
          <tr style="border-bottom:1px solid #ccc;">
            <th align="left">Producto</th>
            <th align="right">Subtotal</th>
          </tr>
          ${itemsRows}
          ${transferHtml}
          ${couponHtml}
          <tr style="border-top:1px solid #ccc;">
            <td><strong>Total a recibir</strong></td>
            <td align="right"><strong>$${order.totalAmount.toFixed(2)}</strong></td>
          </tr>
        </mj-table>

        <mj-divider border-color="#ddd" padding="16px 0"/>

        <mj-text font-size="16px" font-weight="bold">📦 Enviar a:</mj-text>
        <mj-text>${metodoEnvio}</mj-text>

        <mj-divider border-color="#ddd" padding="16px 0"/>

        <mj-text font-size="12px" color="#999999">
          Este mensaje fue generado automáticamente por el sistema de Punky Pet.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

  return mjml2html(mjml).html;
};
