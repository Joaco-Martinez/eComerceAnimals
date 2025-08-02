interface Params {
  userName: string;
  orderNumber: string;
}

export const generateClientOrderCancelledMjmlTemplate = ({ userName, orderNumber }: Params) => {
  return `
<mjml>
  <mj-head>
    <mj-title>Punky Pet - Pedido cancelado</mj-title>
    <mj-preview>Tu pedido #${orderNumber} fue cancelado automáticamente</mj-preview>
  </mj-head>
  <mj-body background-color="#E0DED1">
    <mj-section padding="24px 0">
      <mj-column>
        <mj-text align="center" font-size="22px" font-weight="bold" color="#2C4B4D" font-family="Playfair Display, serif">
          ¡Hola ${userName}!
        </mj-text>
        <mj-text align="center" font-size="16px" color="#918283">
          Tu pedido <strong style="color:#2C4B4D;">#${orderNumber}</strong> fue cancelado automáticamente<br/>
          porque no recibimos el pago dentro de las 12 horas.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#FFFFFF" padding="24px" border-radius="8px">
      <mj-column>
        <mj-text font-size="16px" color="#918283">
          El stock reservado ya está nuevamente disponible para otros punkypets 😉
        </mj-text>

        <mj-button
          background-color="#2C4B4D"
          color="#ffffff"
          font-size="16px"
          border-radius="8px"
          href="https://www.punkypet.com.ar"
          padding="24px 0"
        >
          🛒 Volver a la tienda
        </mj-button>

        <mj-text font-size="14px" color="#918283" padding-top="16px">
          Si necesitás ayuda o querés volver a intentar la compra, no dudes en contactarnos.
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
};


