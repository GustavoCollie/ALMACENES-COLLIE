import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye } from 'lucide-react';

const Privacy = () => {
    return (
        <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="text-primary-600 hover:underline text-sm font-semibold mb-8 inline-block">&larr; Volver a la tienda</Link>
                <h1 className="text-3xl font-black text-gray-900 font-['Outfit'] mb-2">Política de Privacidad</h1>
                <p className="text-gray-500 mb-10">Última actualización: Febrero 2026</p>

                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 flex gap-4 mb-8">
                    <ShieldCheck className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                        <h2 className="font-bold text-gray-900 mb-1">Tu seguridad es nuestra prioridad</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            <strong>No almacenamos datos de tarjetas de crédito ni débito.</strong> Todos los pagos son procesados directamente por Stripe, una plataforma certificada PCI DSS Nivel 1, el estándar de seguridad más alto en la industria de pagos.
                        </p>
                    </div>
                </div>

                <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3 flex items-center gap-2">
                            <Eye className="w-5 h-5 text-primary-600" />
                            1. Información que Recopilamos
                        </h2>
                        <p className="mb-3">Recopilamos la siguiente información cuando usted utiliza nuestro sitio:</p>
                        <ul className="space-y-2">
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span><strong>Datos de registro:</strong> nombre completo, correo electrónico, teléfono (opcional).</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span><strong>Datos de envío:</strong> dirección de entrega, distrito, departamento.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span><strong>Datos de pedido:</strong> historial de compras, productos adquiridos, montos.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span><strong>Datos de autenticación:</strong> si utiliza Google Sign-In, recibimos su nombre y correo de Google. No accedemos a su contraseña de Google.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-primary-600" />
                            2. Datos de Pago y Seguridad
                        </h2>
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-3">
                            <p className="font-semibold text-amber-800">
                                IcaImporta.pe NO almacena, procesa ni tiene acceso a los datos de su tarjeta de crédito o débito.
                            </p>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Los pagos son procesados íntegramente por <strong>Stripe</strong>, una plataforma de pagos con certificación PCI DSS Nivel 1.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Los datos de su tarjeta se ingresan directamente en los servidores seguros de Stripe, nunca pasan por nuestros sistemas.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Solo recibimos una confirmación de pago exitoso o fallido, sin datos sensibles de la tarjeta.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Toda la comunicación con Stripe se realiza mediante conexiones cifradas (HTTPS/TLS).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">3. Uso de la Información</h2>
                        <p className="mb-3">Utilizamos su información personal para:</p>
                        <ul className="space-y-2">
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Procesar y gestionar sus pedidos.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Enviarle notificaciones sobre el estado de su compra.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Brindarle soporte técnico y atención al cliente.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Emitir comprobantes de pago según normativa de SUNAT.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span>Mejorar nuestros servicios y experiencia de usuario.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">4. Compartición de Datos</h2>
                        <p className="mb-3">No vendemos ni alquilamos su información personal a terceros. Solo compartimos datos con:</p>
                        <ul className="space-y-2">
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span><strong>Stripe:</strong> para el procesamiento seguro de pagos.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span><strong>Empresas de transporte:</strong> nombre y dirección de envío para la entrega de su pedido.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span><strong>Autoridades competentes:</strong> cuando sea requerido por ley o por orden judicial.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">5. Protección de Datos</h2>
                        <p>
                            Implementamos medidas técnicas y organizativas para proteger su información personal contra acceso no autorizado, pérdida o alteración. Esto incluye cifrado de datos en tránsito, almacenamiento seguro y control de acceso restringido.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">6. Sus Derechos</h2>
                        <p className="mb-3">
                            De acuerdo con la Ley N° 29733 - Ley de Protección de Datos Personales del Perú, usted tiene derecho a:
                        </p>
                        <ul className="space-y-2">
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span><strong>Acceso:</strong> solicitar información sobre los datos personales que tenemos sobre usted.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span><strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span><strong>Cancelación:</strong> solicitar la eliminación de sus datos personales cuando ya no sean necesarios.</li>
                            <li className="flex gap-2"><span className="text-primary-600 font-bold">•</span><strong>Oposición:</strong> oponerse al tratamiento de sus datos para fines específicos.</li>
                        </ul>
                        <p className="mt-3">
                            Para ejercer estos derechos, contáctenos por WhatsApp o correo electrónico.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">7. Cookies</h2>
                        <p>
                            Utilizamos cookies técnicas necesarias para el funcionamiento del sitio (sesión de usuario, carrito de compras). No utilizamos cookies de seguimiento publicitario ni compartimos información de navegación con terceros.
                        </p>
                    </section>

                    <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-3">Contacto</h2>
                        <p>
                            Para consultas sobre nuestra política de privacidad o para ejercer sus derechos sobre datos personales:
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

export default Privacy;
