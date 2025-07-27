import mjml2html from 'mjml';
import { Order, User, Address, Product } from '@prisma/client';
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

export interface OrderWithDetails extends Order {
  user: User;
  address: Address;
  items: {
    quantity: number;
    product: Product;
  }[];
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

// Template para orden general (pago con tarjeta, etc.)
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

// Template para orden con transferencia
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
          <mj-text padding-bottom="8px">Titular: <strong>Joaquín Martinez</strong></mj-text>
          <mj-text padding-bottom="8px">CUIL: <strong>20-46587629-9</strong></mj-text>
          <mj-text padding-bottom="8px">Cuenta: <strong>CA $ 37617210354446</strong></mj-text>
          <mj-text padding-bottom="8px">Alias: <strong>Joaco2006.m</strong></mj-text>
          <mj-text padding-bottom="8px">CBU: <strong>0110721230072103544465</strong></mj-text>
          <mj-text padding-bottom="8px">Monto a transferir: <strong>$${order.totalAmount.toFixed(2)}</strong></mj-text>

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
<mj-text padding-bottom="12px">${direccion}</mj-text>

<mj-text font-size="16px" font-weight="bold" padding-top="12px">📎 Instrucciones</mj-text>
<mj-text css-class="subtitle" padding-bottom="16px">
  Una vez realizado el pago, enviá el comprobante por alguno de los medios a continuación.
</mj-text>

<mj-button
  href="https://api.whatsapp.com/send?phone=543546431231&text=Hola%2C%20te%20envio%20el%20comprobante%20de%20la%20transferencia%20de%20la%20orden%20%23${order.orderNumber}"
  background-color="#25D366"
  color="#fff"
  font-size="13px"
  inner-padding="10px 16px"
  border-radius="6px"
  width="100%"
  align="center"
>
  Enviar por WhatsApp
</mj-button>

<mj-button
  href="mailto:mascotiendavgbpets@gmail.com?subject=Comprobante%20de%20transferencia%20-%20Orden%20${order.orderNumber}&body=Hola,%20adjunto%20el%20comprobante%20de%20la%20orden%20${order.orderNumber}."
  background-color="#D44638"
  color="#fff"
  font-size="13px"
  inner-padding="10px 16px"
  border-radius="6px"
  width="100%"
  align="center"
  padding-top="8px"
>
  Enviar por Gmail
</mj-button>

<mj-divider border-color="#e0e0e0" padding="16px 0" />

<mj-text css-class="subtitle" padding-bottom="8px">
  <strong>Importante:</strong><br/>
  El pago deberá realizarse dentro de las 24 horas desde la compra.<br/>
  De lo contrario, la orden será cancelada automáticamente.
</mj-text>

<mj-text css-class="subtitle">
  Cuando confirmemos tu pago, te enviaremos un email de confirmación.<br/>
  Luego recibirás otro correo cuando el pedido sea despachado.
</mj-text>
    </mj-body>
  </mjml>
  `;

  return mjml2html(mjml).html;
};

export const generateLowStockAlertEmailTemplate = (
  name: string,
  sku: string,
  id: string,
  stock: number
) => {
  return `
<mjml>
  <mj-head>
    <mj-title>Alerta de Stock Bajo</mj-title>
    <mj-preview>Stock bajo en producto ${name}</mj-preview>
    <mj-attributes>
      <mj-all font-family="Helvetica, Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.5" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f8f8f8">
    <mj-section background-color="#ffffff" padding="20px">
      <mj-column>
        <mj-text font-size="18px" font-weight="bold" color="#2C4B4D">
          ⚠️ Alerta de Stock Bajo
        </mj-text>

        <mj-text>
          El producto <strong>${name}</strong> tiene un stock bajo.
        </mj-text>

        <mj-text>
          <strong>SKU:</strong> ${sku}<br/>
          <strong>ID:</strong> ${id}<br/>
          <strong>Stock actual:</strong> ${stock} unidad${stock === 1 ? '' : 'es'}
        </mj-text>

        <mj-text color="#a94442" font-weight="bold">
          Por favor, reponer el stock lo antes posible.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding-top="0">
      <mj-column>
        <mj-divider border-color="#C4BFAB" />
        <mj-text font-size="12px" color="#999999">
          Este mensaje fue generado automáticamente por el sistema de Punky Pet.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `;
};

export const sendTrackingEmailTemplate = (order: OrderWithDetails) => {
  const itemsRows = order.items
    .map(
      item => `
        <tr style="border-bottom:1px solid #ddd;">
          <td style="padding:8px 0;">${item.quantity} x ${item.product.name}</td>
          <td style="text-align:right;">$${(item.product.price * item.quantity).toFixed(2)}</td>
        </tr>
      `
    )
    .join('');

  const address = order.address;
  const direccion = `
    ${address.calle}, ${address.localidad}, ${address.provincia} <br/>
    Código Postal: ${address.postalCode}
  `;

  return `
    <div style="font-family:sans-serif; background:#E0DED1; color:#2C4B4D; padding:24px; border-radius:12px; max-width:600px; margin:auto;">
      
      <!-- Logo -->
      <div style="text-align:center; margin-bottom:20px;">
        <img 
          src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1753574629/punky_pet_isotipo_2_png_1_utytfg.png" 
          alt="Logo Punky Pet" 
          width="100" 
          style="display:block; margin:auto;" 
        />
      </div>

      <!-- Encabezado -->
      <h2 style="color:#2C4B4D;">¡Tu pedido fue despachado! 🎉</h2>
      <p>Hola ${order.user.name || 'cliente'},</p>
      <p>Tu pedido <strong>#${order.orderNumber}</strong> ha sido enviado. A continuación, los detalles:</p>

      <!-- Productos -->
      <h3 style="margin-top:24px;">📦 Productos</h3>
      <table style="width:100%; border-collapse:collapse; margin-bottom:16px;">
        ${itemsRows}
      </table>

      <!-- Dirección -->
      <h3 style="margin-top:24px;">📍 Dirección de envío</h3>
      <p>${direccion}</p>

      <!-- Seguimiento -->
      <h3 style="margin-top:24px;">🔎 Número de seguimiento</h3>
      <div style="background:white; padding:12px 18px; border-radius:8px; display:inline-block; font-size:18px; font-weight:bold; margin-bottom:8px;">
        ${order.trackingNumber}
      </div>

      <!-- Link de seguimiento -->
      <p style="margin-top:8px;">
        Podés hacer seguimiento desde: 
        <a href="https://www.correoargentino.com.ar/formularios/e-commerce" target="_blank" style="color:#2C4B4D; font-weight:bold; text-decoration:underline;">
          correoargentino.com.ar
        </a>
      </p>

      <!-- Footer -->
      <p style="margin-top:32px;">Gracias por confiar en <strong>Punky Pet</strong> 💚</p>
    </div>
  `;
};

