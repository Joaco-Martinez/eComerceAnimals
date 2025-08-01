"use client";

export default function PoliticaCambios() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 ">
      <h1 className="text-4xl font-bold text-center text-[#2C4B4D] font-serif mb-12">
        Política de Cambios y Devoluciones
      </h1>

      <div className="space-y-10 text-[#2C4B4D]">

        {/* Motivos válidos */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">🔁 Motivos válidos para solicitar un cambio</h2>
          <ul className="list-disc list-inside pl-4 text-[#918283]">
            <li>Talle incorrecto (error al elegir por parte del cliente).</li>
            <li>Color diferente al solicitado.</li>
            <li>Producto con falla de fábrica (descosido, relleno defectuoso, cierre dañado, etc.).</li>
            <li>Productos electrónicos que presenten fallas de funcionamiento.</li>
          </ul>
        </div>

        {/* Condiciones para cambio */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">❌ Condiciones para realizar el cambio</h2>
          <ul className="list-disc list-inside pl-4 text-[#918283]">
            <li>No se aceptan cambios si el producto fue lavado, usado o modificado.</li>
            <li>No se aceptan cambios si pasaron más de 7 días desde la recepción.</li>
            <li>No se aceptan cambios si el daño fue causado por mal uso o mal cuidado.</li>
          </ul>
        </div>

        {/* Garantía electrónica */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">📱 Productos electrónicos con garantía</h2>
          <p className="text-[#918283] mb-2">
            En caso de falla en un producto electrónico, este será enviado al servicio técnico para su evaluación.
          </p>
          <p className="text-[#918283]">
            Una vez confirmado el defecto de fábrica, se podrá:
          </p>
          <ul className="list-disc list-inside pl-4 text-[#918283] mt-1">
            <li>Entregar un producto nuevo.</li>
            <li>Reconocer el valor para que el cliente elija otro artículo.</li>
          </ul>
        </div>

        {/* Costos de envío */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">📦 Costos de envío</h2>
          <ul className="list-disc list-inside pl-4 text-[#918283]">
            <li>
              👉 Si el error fue de Punky Pet (producto/talle/color equivocado o falla de fábrica): <strong>Punky Pet cubre el envío</strong>.
            </li>
            <li>
              👉 Si el cambio es por error del cliente (por ejemplo, eligió mal el talle): <strong>el cliente abona el envío</strong>.
            </li>
          </ul>
        </div>

        {/* Importante */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">⚠️ Importante</h2>
          <ul className="list-disc list-inside pl-4 text-[#918283]">
            <li>Los cambios se realizan solo dentro de los primeros 7 días desde que recibís el producto.</li>
            <li><strong>No se realizan devoluciones ni reintegros de dinero.</strong></li>
            <li>Si no hay stock, se podrá elegir otro modelo de igual valor o abonar la diferencia.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
