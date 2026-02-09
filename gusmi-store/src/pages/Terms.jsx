import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="text-primary-600 hover:underline text-sm font-semibold mb-8 inline-block">&larr; Volver a la tienda</Link>
                <h1 className="text-3xl font-black text-gray-900 font-['Outfit'] mb-2">Términos y Condiciones</h1>
                <p className="text-gray-500 mb-10">Última actualización: Febrero 2026</p>

                <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">1. Información General</h2>
                        <p>
                            IcaImporta.pe es una plataforma de comercio electrónico dedicada a la importación y venta de sistemas de riego y productos agrícolas. Al acceder y utilizar este sitio web, usted acepta estos términos y condiciones en su totalidad.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">2. Productos y Precios</h2>
                        <ul className="space-y-2">
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Los precios mostrados incluyen IGV (18%) conforme a la legislación tributaria peruana.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Los precios de pre-venta son especiales y están vigentes hasta agotar cupos o hasta la fecha indicada.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Nos reservamos el derecho de modificar precios sin previo aviso. Los pedidos confirmados y pagados mantienen el precio al momento de la compra.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Las imágenes de los productos son referenciales. Pueden existir variaciones menores de color o presentación.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">3. Proceso de Compra</h2>
                        <p className="mb-2">
                            Al realizar una compra en IcaImporta.pe, el usuario declara ser mayor de 18 años y contar con capacidad legal para contratar, conforme al Código Civil del Perú.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>El pedido se confirma una vez procesado exitosamente el pago.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Recibirá una confirmación por correo electrónico con los detalles de su compra.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>La disponibilidad de stock está sujeta a verificación al momento del pago.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">4. Pre-Venta y Reservas</h2>
                        <ul className="space-y-2">
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Los productos en pre-venta se encuentran en proceso de importación. La fecha de entrega es estimada y puede variar.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>El pago de la pre-venta constituye una reserva firme del producto al precio especial indicado.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>En caso de cancelación de la importación por causas de fuerza mayor, se procederá al reembolso total del monto pagado.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">5. Envíos y Entregas</h2>
                        <p>
                            Los plazos y condiciones de envío se detallan en nuestra <Link to="/envios" className="text-primary-600 hover:underline font-semibold">Política de Envíos</Link>. Al realizar una compra, el usuario acepta dichas condiciones.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">6. Garantía y Devoluciones</h2>
                        <ul className="space-y-2">
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Todos los productos cuentan con la garantía del fabricante, conforme a la Ley N° 29571 - Código de Protección y Defensa del Consumidor.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>El consumidor tiene derecho a la reparación, reposición o devolución del producto en caso de defectos de fábrica.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Para hacer efectiva la garantía, contacte a nuestro equipo de soporte por WhatsApp con su número de pedido y evidencia del defecto.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>No se aceptan devoluciones por productos dañados por mal uso, instalación incorrecta o desgaste natural.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">7. Derecho de Desistimiento</h2>
                        <p>
                            De acuerdo con la legislación peruana vigente, el consumidor puede ejercer su derecho de desistimiento dentro de los 7 días calendario posteriores a la recepción del producto, siempre que este se encuentre en su empaque original, sin uso y en perfecto estado. Los costos de envío por devolución corren por cuenta del comprador.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">8. Libro de Reclamaciones</h2>
                        <p>
                            En cumplimiento del Decreto Supremo N° 011-2011-PCM y la Ley N° 29571, IcaImporta.pe pone a disposición de sus clientes un Libro de Reclamaciones virtual. Para presentar un reclamo o queja, contáctenos por WhatsApp o correo electrónico. Su reclamo será atendido en un plazo máximo de 30 días calendario conforme a ley.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">9. Propiedad Intelectual</h2>
                        <p>
                            Todo el contenido del sitio web (textos, imágenes, logos, diseño) es propiedad de IcaImporta.pe o de sus respectivos titulares. Queda prohibida su reproducción total o parcial sin autorización expresa.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">10. Legislación Aplicable</h2>
                        <p>
                            Estos términos se rigen por las leyes de la República del Perú. Para cualquier controversia derivada del uso de este sitio o de las transacciones realizadas, las partes se someten a la jurisdicción de los tribunales competentes de la ciudad de Ica, Perú, o a las instancias de INDECOPI según corresponda.
                        </p>
                    </section>

                    <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">Contacto</h2>
                        <p>
                            Para consultas sobre estos términos y condiciones, puede contactarnos a través de:
                        </p>
                        <ul className="mt-2 space-y-1">
                            <li><strong>WhatsApp:</strong> +51 995 876 300</li>
                            <li><strong>Email:</strong> contacto@icaimporta.pe</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
