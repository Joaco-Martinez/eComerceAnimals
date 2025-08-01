"use client";

export default function TermsAndConditions() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 ">
      <h1 className="text-4xl font-bold text-center text-[#2C4B4D] font-serif mb-12">
        Términos y Condiciones
      </h1>

      <div className="space-y-10 text-[#2C4B4D] leading-relaxed text-[17px]">

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">1. Identidad del emprendimiento</h2>
          <p>
            Punky Pet es un emprendimiento argentino dedicado a la venta de productos para mascotas.
            El uso de este sitio implica la aceptación de los presentes Términos y Condiciones.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">2. Aceptación del cliente</h2>
          <ul className="list-disc list-inside pl-4 text-[#918283]">
            <li>El cliente declara haber leído y aceptado estos Términos y Condiciones.</li>
            <li>Se compromete a brindar información veraz al realizar una compra.</li>
            <li>Punky Pet se reserva el derecho de modificar precios, productos y condiciones sin previo aviso.</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">3. Precios y stock</h2>
          <ul className="list-disc list-inside pl-4 text-[#918283]">
            <li>Todos los precios están expresados en pesos argentinos (ARS).</li>
            <li>Los precios pueden variar sin previo aviso.</li>
            <li>La disponibilidad de productos está sujeta a stock.</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">4. Medios de pago</h2>
          <p className="text-[#918283]">
            Aceptamos Mercado Pago (tarjetas, débito, dinero en cuenta) y transferencia bancaria.
            El pedido será confirmado una vez acreditado el pago. 
          </p>
          <p className="text-[#918283]">
            Los pedidos a abonar a traves de transferencia bancaria deberán ser abonado dentro de las 24hrs, de lo contrario se cancela dicho pedido.
            la compra quedara confirmada una vez recibido el comprobante de trasnferencia.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">5. Envíos</h2>
          <ul className="list-disc list-inside pl-4 text-[#918283]">
            <li>Envíos a todo el país mediante Correo Argentino.</li>
            <li>El cliente puede elegir entre domicilio o retiro en sucursal.</li>
            <li>El tiempo estimado es de 7 a 10 días hábiles desde la acreditación del pago.</li>
            <li>No nos responsabilizamos por demoras causadas por el correo.</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">6. Cambios y devoluciones</h2>
          <p className="text-[#918283]">
            Se aceptan cambios dentro de los 7 días de recibido el producto. No realizamos devoluciones ni reintegros
            de dinero. Ver más en nuestra <strong>Política de Cambios y Devoluciones</strong>.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">7. Productos electrónicos</h2>
          <p className="text-[#918283]">
            Los productos electrónicos cuentan con garantía por fallas de fábrica. En caso de falla serán enviados
            al servicio técnico correspondiente para evaluación.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">8. Protección de datos</h2>
          <p className="text-[#918283]">
            Los datos personales brindados son utilizados exclusivamente para gestionar la compra. No compartimos
            información con terceros. Cumplimos con la Ley 25.326 de Protección de Datos Personales.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">9. Propiedad intelectual</h2>
          <p className="text-[#918283]">
            Todo el contenido de este sitio (imágenes, textos, logos, diseño) es propiedad de Punky Pet. Está
            prohibida su reproducción sin autorización previa.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">10. Modificaciones</h2>
          <p className="text-[#918283]">
            Punky Pet se reserva el derecho de modificar estos términos en cualquier momento. Te recomendamos revisarlos periódicamente.
          </p>
        </div>
      </div>
    </section>
  );
}
