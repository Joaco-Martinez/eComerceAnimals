import mjml2html from 'mjml';
export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  color: string;
  size: string;
  product: {
    name: string;
  };
}

export interface OrderAddress {
  calle: string;
  localidad: string;
  provincia: string;
  postalCode: string;
}

export interface OrderUser {
  name: string | null;
  email: string;
}

export interface OrderEmailTemplateData {
  orderNumber: string;
  totalAmount: number;
  items: OrderItem[];
  address: OrderAddress;
  user: OrderUser;
  shippingMethod: 'domicilio' | 'sucursal';
}

export const generateOrderEmailTemplate = (order: OrderEmailTemplateData) => {
  const itemsRows = order.items
    .map(
      (item) => `
        <tr style="border-bottom:1px solid #ccc;">
          <td>${item.quantity} x ${item.product.name}</td>
          <td align="right">$${item.unitPrice.toFixed(2)}</td>
        </tr>
      `
    )
    .join('');

  const mjml = `
<mjml>
  <mj-head>
    <mj-title>Punky Pet - Orden creada</mj-title>
    <mj-preview>¡Gracias por tu compra, ${order.user.name}!</mj-preview>
    <mj-style>
      .small {
        font-size: 13px;
        color: #777;
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="#f4f4f4">
    <mj-section padding="24px 0">
      <mj-column>
        <mj-text align="center" font-size="20px" font-weight="bold" color="#333">
          ¡Gracias por tu compra, ${order.user.name}!
        </mj-text>
        <mj-text align="center" font-size="16px">
          Tu orden <strong>#${order.orderNumber}</strong> fue generada correctamente.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="24px" border-radius="8px">
      <mj-column>
        <mj-text font-size="16px" font-weight="bold">🛍️ Resumen de la orden</mj-text>
        <mj-table cellpadding="6">
          <tr style="border-bottom:1px solid #ccc;">
            <th align="left">Producto</th>
            <th align="right">Precio</th>
          </tr>
          ${itemsRows}
        </mj-table>

        <mj-text align="right" font-size="16px" font-weight="bold" padding-top="12px">
          Total: $${order.totalAmount.toFixed(2)}
        </mj-text>

        <mj-divider border-color="#ddd" padding="16px 0" />

        <mj-text font-size="16px" font-weight="bold">📦 Envío a:</mj-text>
        <mj-text>
          ${order.address.calle}, ${order.address.localidad}, ${order.address.provincia}, CP ${order.address.postalCode}<br/>
          Método: <strong>${order.shippingMethod === 'domicilio' ? 'Domicilio' : 'Sucursal de Correo'}</strong>
        </mj-text>

        <mj-text padding-top="20px" css-class="small">
          Te avisaremos por correo electrónico cuando el pedido sea despachado.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section padding="16px 0">
      <mj-column>
        <mj-text align="center" font-size="13px" color="#999">
          © 2025 Punky Pet. Todos los derechos reservados.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

  return mjml2html(mjml).html;
};


export const generateTransferEmailTemplate = (order: OrderEmailTemplateData) => {
  const itemsRows = order.items
    .map(item => `
      <tr style="border-bottom:1px solid #ccc;">
        <td>${item.quantity} x ${item.product.name}</td>
        <td align="right">$${(item.unitPrice * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

  const direccion = order.shippingMethod === 'domicilio'
    ? `A domicilio: ${order.address.calle}, ${order.address.localidad}, ${order.address.provincia}, CP ${order.address.postalCode}`
    : `A sucursal del correo en ${order.address.localidad}, ${order.address.provincia}, CP ${order.address.postalCode}`;

  const mjml = `
  <mjml>
    <mj-head>
      <mj-title>Punky Pet - Orden con Transferencia</mj-title>
      <mj-preview>Gracias por tu compra. Instrucciones para la transferencia bancaria</mj-preview>
      <mj-style>
        .subtitle {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }
      </mj-style>
    </mj-head>
    <mj-body background-color="#f4f4f4">
      <mj-section padding="24px 0">
        <mj-column>
          <mj-text align="center" font-size="20px" font-weight="bold">
            ¡Gracias por tu compra, ${order.user.name}!
          </mj-text>
          <mj-text align="center" font-size="16px" color="#333">
            Tu orden <strong>#${order.orderNumber}</strong> fue generada correctamente.
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-section background-color="#ffffff" padding="24px" border-radius="8px">
        <mj-column>
          <mj-text font-size="16px" font-weight="bold">🏦 Datos para la transferencia</mj-text>
          <mj-text padding-bottom="8px">
            Titular: <strong>Joaquín Martinez</strong>
          </mj-text>
          <mj-text padding-bottom="8px">
            CUIL: <strong>20-46587629-9</strong>
          </mj-text>
          <mj-text padding-bottom="8px">
            Cuenta: <strong>CA $ 37617210354446</strong>
          </mj-text>
          <mj-text padding-bottom="8px">
            Alias: <strong>Joaco2006.m</strong>
          </mj-text>
          <mj-text padding-bottom="8px">
            CBU: <strong>0110721230072103544465</strong>
          </mj-text>
          <mj-text padding-bottom="8px">
            Monto a transferir: <strong>$${order.totalAmount.toFixed(2)}</strong>
          </mj-text>

          <mj-divider border-color="#e0e0e0" padding="16px 0" />

          <mj-text font-size="16px" font-weight="bold">🛍️ Resumen de la orden</mj-text>
          <mj-table cellpadding="6">
            <tr style="border-bottom:1px solid #ccc;">
              <th align="left">Producto</th>
              <th align="right">Precio</th>
            </tr>
            ${itemsRows}
          </mj-table>

          <mj-text align="right" font-size="16px" font-weight="bold" padding-top="8px">
            Total: $${order.totalAmount.toFixed(2)}
          </mj-text>

          <mj-divider border-color="#e0e0e0" padding="16px 0" />

          <mj-text font-size="16px" font-weight="bold">🚚 Método de envío</mj-text>
          <mj-text>${direccion}</mj-text>

          <mj-text padding-top="16px" css-class="subtitle">
            Una vez confirmado el pago recibirás un correo de confirmación.<br/>
            Luego te avisaremos cuando el pedido sea despachado.
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-section padding="16px 0">
        <mj-column>
          <mj-text align="center" font-size="13px" color="#999">
            © 2025 Punky Pet. Todos los derechos reservados.
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `;

  return mjml2html(mjml).html;
};