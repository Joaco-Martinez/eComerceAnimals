"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInternalOrderCancelledNotification = void 0;
const generateInternalOrderCancelledNotification = ({ userName, userEmail, orderNumber, }) => {
    return `
<mjml>
  <mj-head>
    <mj-title>Punky Pet - Pedido cancelado</mj-title>
    <mj-preview>Cancelación automática del pedido #${orderNumber}</mj-preview>
  </mj-head>
  <mj-body background-color="#E0DED1">
    <mj-section padding="24px 0">
      <mj-column>
        <mj-text align="center" font-size="22px" font-weight="bold" color="#2C4B4D" font-family="Playfair Display, serif">
          📦 Pedido cancelado automáticamente
        </mj-text>
        <mj-text align="center" font-size="16px" color="#918283">
          El pedido <strong style="color:#2C4B4D;">#${orderNumber}</strong> fue cancelado por falta de pago en 12 horas.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="24px" border-radius="8px">
      <mj-column>
        <mj-text font-size="16px" color="#918283">
          <strong>Cliente:</strong> ${userName} <br/>
          <strong>Email:</strong> ${userEmail}
        </mj-text>

        <mj-divider border-color="#ccc" padding="16px 0" />

        <mj-text font-size="15px" color="#2C4B4D">
          ✅ El stock de los productos fue restablecido automáticamente.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section padding="16px 0">
      <mj-column>
        <mj-text align="center" font-size="13px" color="#999">
          Este es un mensaje automático del sistema de Punky Pet 🐾
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
};
exports.generateInternalOrderCancelledNotification = generateInternalOrderCancelledNotification;
