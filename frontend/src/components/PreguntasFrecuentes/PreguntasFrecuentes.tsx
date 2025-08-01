"use client";

export default function PreguntasFrecuentes() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16  rounded-2xl ">
      <h1 className="text-4xl font-bold text-center text-[#2C4B4D] font-serif mb-12">
        Preguntas Frecuentes
      </h1>

      <div className="space-y-10 text-[#2C4B4D]">

        {/* Bloque FAQ */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">¿Cuáles son las formas de pago?</h2>
          <p className="mb-2">Aceptamos los siguientes medios de pago:</p>
          <ul className="list-disc list-inside pl-4 text-[#918283]">
            <li>Mercado Pago (tarjeta de crédito, débito y dinero en cuenta).</li>
            <li>Transferencia bancaria (enviaremos los datos al momento de la compra).</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">¿Cuál es el costo de envío?</h2>
          <p className="mb-2">Realizamos envíos a todo el país a través de Correo Argentino:</p>
          <ul className="list-disc list-inside pl-4 text-[#918283]">
            <li>Productos chicos: $ _</li>
            <li>Productos medianos: $ _</li>
            <li>Productos grandes: $ _</li>
          </ul>
          <p className="mt-2 text-sm text-[#918283] italic">
            * Los valores se calculan según peso y destino. Consultanos para confirmar el costo exacto.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">¿Cómo se realizan los envíos?</h2>
          <p className="text-[#918283]">
            Trabajamos con Correo Argentino para envíos a domicilio o retiro en sucursal.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">¿Dónde puedo recibir mi pedido?</h2>
          <ul className="list-disc list-inside pl-4 text-[#918283]">
            <li>Tu domicilio (dirección indicada al realizar la compra).</li>
            <li>Sucursal de Correo Argentino (retiro con DNI).</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">¿Cuánto tarda en llegar mi pedido?</h2>
          <p className="text-[#918283]">
            El tiempo de entrega estimado es de 7 a 10 días hábiles luego de acreditado el pago (para el interior del país).
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">¿Cuál es el plazo para realizar un cambio?</h2>
          <p className="text-[#918283]">
            Podés solicitar un cambio dentro de los 7 días corridos desde que recibís el producto.
          </p>
        </div>
      </div>
    </section>
  );
}
