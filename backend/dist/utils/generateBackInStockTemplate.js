"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBackInStockEmailTemplate = void 0;
const generateBackInStockEmailTemplate = (product) => {
    return `
  <mjml>
    <mj-head>
      <mj-title>${product.name} está disponible de nuevo</mj-title>
      <mj-preview>¡Apurate! Este producto vuelve a estar en stock 🎉</mj-preview>
      <mj-style>
        .highlight {
          color: #2C4B4D;
          font-weight: bold;
        }
      </mj-style>
    </mj-head>
    <mj-body background-color="#F6F6F6">
      <mj-section background-color="#ffffff" padding="20px" border-radius="8px">
        <mj-column>
          <mj-text align="center" font-size="22px" font-weight="bold" color="#2C4B4D">
            ¡${product.name} está de vuelta!
          </mj-text>

          <mj-image src="${product.image}" alt="${product.name}" padding="20px 0" border-radius="8px" />

          <mj-text align="center" font-size="16px" color="#555">
            Sabemos que estabas esperando este producto y tenemos buenas noticias: <span class="highlight">${product.name}</span> ya está disponible nuevamente.
          </mj-text>

          <mj-button
            href="https://punkypet.com"
            background-color="#2C4B4D"
            color="#ffffff"
            font-size="16px"
            padding="20px"
            border-radius="6px"
          >
            Ver producto
          </mj-button>

          <mj-text align="center" font-size="14px" color="#999" padding-top="10px">
            Si ya no querés recibir notificaciones de este tipo, podés ignorar este mensaje.
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `;
};
exports.generateBackInStockEmailTemplate = generateBackInStockEmailTemplate;
