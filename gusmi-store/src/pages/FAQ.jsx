import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
    {
        category: "Compras y Pedidos",
        items: [
            {
                q: "¿Cómo realizo una compra?",
                a: "Navega por nuestro catálogo, agrega los productos al carrito y procede al checkout. Aceptamos pagos seguros con tarjeta de crédito/débito a través de Stripe."
            },
            {
                q: "¿Qué métodos de pago aceptan?",
                a: "Aceptamos tarjetas Visa, Mastercard, American Express y otras tarjetas internacionales. Todos los pagos son procesados de forma segura por Stripe. No almacenamos datos de tu tarjeta."
            },
            {
                q: "¿Puedo cancelar mi pedido?",
                a: "Puedes solicitar la cancelación contactándonos por WhatsApp antes de que el pedido sea despachado. Para productos en pre-venta, consulta nuestras condiciones de reserva."
            },
            {
                q: "¿Emiten factura o boleta?",
                a: "Sí, emitimos comprobantes de pago según la normativa de SUNAT. Indícanos tus datos de facturación al momento de la compra o por WhatsApp."
            },
        ]
    },
    {
        category: "Pre-Venta e Importación",
        items: [
            {
                q: "¿Qué es la pre-venta?",
                a: "La pre-venta te permite reservar productos que están en proceso de importación directa desde fábrica. Al reservar, obtienes un precio especial menor al precio regular de venta."
            },
            {
                q: "¿Cuándo recibiré mi producto de pre-venta?",
                a: "Cada producto de pre-venta tiene una fecha estimada de entrega visible en su ficha. Una vez que el producto llega a nuestro almacén en Ica, lo despachamos en 24-48 horas."
            },
            {
                q: "¿Por qué los precios de pre-venta son más bajos?",
                a: "Porque importamos directamente de fábrica sin intermediarios. Al reservar antes de la llegada, nos ayudas a planificar la importación y trasladamos ese ahorro a ti."
            },
            {
                q: "¿Qué pasa si el producto no llega en la fecha estimada?",
                a: "Te mantendremos informado sobre cualquier cambio en la fecha de llegada. Si decides cancelar por un retraso significativo, gestionaremos tu reembolso completo."
            },
        ]
    },
    {
        category: "Envíos y Entregas",
        items: [
            {
                q: "¿Cuánto tarda el envío de productos en stock?",
                a: "Los productos en stock se despachan en 24-48 horas hábiles desde nuestro almacén en Ica. El tiempo total de entrega depende de tu ubicación."
            },
            {
                q: "¿Hacen envíos a todo el Perú?",
                a: "Sí, realizamos envíos a nivel nacional. Trabajamos con empresas de transporte confiables para llegar a todas las regiones del país."
            },
            {
                q: "¿Puedo recoger mi pedido en persona?",
                a: "Sí, ofrecemos la opción de recojo en nuestro almacén en Ica sin costo adicional. Selecciona 'Recojo en tienda' al momento del checkout."
            },
        ]
    },
    {
        category: "Productos y Garantía",
        items: [
            {
                q: "¿Los productos tienen garantía?",
                a: "Sí, todos nuestros productos cuentan con garantía del fabricante. La duración varía según el producto y está especificada en la ficha técnica."
            },
            {
                q: "¿Ofrecen asesoría técnica para la instalación?",
                a: "Sí, brindamos asesoría técnica gratuita por WhatsApp. Te ayudamos a elegir el sistema de riego adecuado y te orientamos en la instalación."
            },
            {
                q: "¿Dónde puedo ver las especificaciones técnicas?",
                a: "Cada producto tiene un botón 'Ficha Técnica' donde puedes descargar las especificaciones completas en PDF, cuando estén disponibles."
            },
        ]
    },
];

const FAQItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-gray-100 rounded-xl overflow-hidden">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-900 text-sm pr-4">{q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                    {a}
                </div>
            )}
        </div>
    );
};

const FAQ = () => {
    return (
        <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="text-primary-600 hover:underline text-sm font-semibold mb-8 inline-block">&larr; Volver a la tienda</Link>
                <h1 className="text-3xl font-black text-gray-900 font-['Outfit'] mb-2">Preguntas Frecuentes</h1>
                <p className="text-gray-500 mb-10">Encuentra respuestas a las dudas más comunes sobre nuestros productos, envíos e importaciones.</p>

                <div className="space-y-10">
                    {faqs.map((section) => (
                        <div key={section.category}>
                            <h2 className="text-lg font-bold text-gray-900 font-['Outfit'] mb-4">{section.category}</h2>
                            <div className="space-y-2">
                                {section.items.map((item) => (
                                    <FAQItem key={item.q} q={item.q} a={item.a} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
