import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, Clock, MapPin } from 'lucide-react';

const ShippingPolicy = () => {
    return (
        <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="text-primary-600 hover:underline text-sm font-semibold mb-8 inline-block">&larr; Volver a la tienda</Link>
                <h1 className="text-3xl font-black text-gray-900 font-['Outfit'] mb-2">Políticas de Envío</h1>
                <p className="text-gray-500 mb-10">Última actualización: Febrero 2026</p>

                <div className="space-y-8">
                    <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 flex gap-4">
                        <Package className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-2">Productos en Stock</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Los productos disponibles en stock se despachan desde nuestro almacén en Ica dentro de las <strong>24 a 48 horas hábiles</strong> posteriores a la confirmación del pago. El tiempo total de entrega depende de tu ubicación geográfica y la empresa de transporte seleccionada.
                            </p>
                        </div>
                    </div>

                    <div className="bg-accent-50 border border-accent-100 rounded-2xl p-6 flex gap-4">
                        <Clock className="w-8 h-8 text-accent-600 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-2">Productos de Pre-Venta (Importación)</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Los productos reservados en pre-venta se encuentran en proceso de importación directa desde fábrica. La entrega se realiza según la <strong>fecha estimada</strong> indicada en la ficha del producto. Una vez que el producto llega a nuestro almacén en Ica, se despacha dentro de las <strong>24 a 48 horas hábiles</strong> adicionales.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                Te notificaremos por correo electrónico o WhatsApp cuando tu producto haya llegado y esté listo para ser despachado.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-4 flex items-center gap-2">
                            <Truck className="w-5 h-5 text-primary-600" />
                            Modalidades de Entrega
                        </h2>
                        <div className="space-y-4">
                            <div className="border border-gray-100 rounded-xl p-5">
                                <h3 className="font-semibold text-gray-900 text-sm mb-2">Recojo en Tienda (Gratis)</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Puedes recoger tu pedido sin costo adicional en nuestro almacén ubicado en Ica. Te notificaremos cuando esté listo para ser recogido.
                                </p>
                            </div>
                            <div className="border border-gray-100 rounded-xl p-5">
                                <h3 className="font-semibold text-gray-900 text-sm mb-2">Envío a Domicilio</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Realizamos envíos a todo el Perú a través de empresas de transporte confiables. El costo de envío se calcula según el peso, volumen y destino del pedido. El monto se informa antes de confirmar la compra.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary-600" />
                            Cobertura
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Realizamos envíos a nivel nacional. Para zonas rurales o de difícil acceso, el tiempo de entrega puede extenderse. Consulta disponibilidad y tiempos estimados para tu zona por WhatsApp.
                        </p>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-4">Consideraciones Importantes</h2>
                        <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                            <li className="flex gap-2">
                                <span className="text-primary-600 font-bold">•</span>
                                Los tiempos de entrega son estimados y pueden variar por factores logísticos, climáticos o aduaneros (en caso de importaciones).
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary-600 font-bold">•</span>
                                Todo pedido incluye un número de seguimiento que será compartido por correo o WhatsApp una vez despachado.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary-600 font-bold">•</span>
                                En caso de retraso significativo en productos de pre-venta, te informaremos oportunamente y podrás solicitar el reembolso completo.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary-600 font-bold">•</span>
                                Verifica que la dirección de entrega sea correcta al momento de la compra. IcaImporta.pe no se responsabiliza por direcciones incorrectas proporcionadas por el comprador.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
