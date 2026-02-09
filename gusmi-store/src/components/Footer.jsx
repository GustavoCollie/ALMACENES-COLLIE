import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg blur opacity-20 group-hover:opacity-40 transition"></div>
                                <div className="relative w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 transform group-hover:scale-105 transition-all shadow-xl overflow-hidden">
                                    <img src="/logo.png" alt="IcaImporta.pe" className="w-full h-full object-contain p-0.5" />
                                </div>
                            </div>
                            <div className="flex flex-col -space-y-1">
                                <span className="text-2xl font-black text-white tracking-tighter">
                                    Ica<span className="text-primary-400">Importa</span><span className="text-accent-400">.pe</span>
                                </span>
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Importaciones & Ventas</span>
                            </div>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Sistemas de riego por importación directa. Conectamos a los agricultores de Ica con tecnología de precisión y precios de fábrica.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-['Outfit'] uppercase tracking-wider text-xs">Explorar</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/" className="hover:text-primary-400 transition">Inicio</Link></li>
                            <li><a href="#" className="hover:text-primary-400 transition">Nuevos Productos</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition">Ofertas Especiales</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition">Categorías</a></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-['Outfit'] uppercase tracking-wider text-xs">Soporte</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-primary-400 transition">Preguntas Frecuentes</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition">Políticas de Envío</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition">Términos y Condiciones</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition">Privacidad</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-['Outfit'] uppercase tracking-wider text-xs">Contacto</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start space-x-3 text-slate-400">
                                <MapPin size={18} className="text-primary-400 flex-shrink-0" />
                                <span>Ica, Perú</span>
                            </li>
                            <li className="flex items-center space-x-3 text-slate-400">
                                <Phone size={18} className="text-primary-400" />
                                <span>+51 987 654 321</span>
                            </li>
                            <li className="flex items-center space-x-3 text-slate-400">
                                <Mail size={18} className="text-primary-400" />
                                <span>contacto@icaimporta.pe</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-slate-500 font-medium tracking-wide">
                        &copy; 2026 IcaImporta.pe. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-slate-600">
                        <span>Powered by</span>
                        <span className="text-slate-400 flex items-center">
                            IcaImporta.pe <ExternalLink size={10} className="ml-1" />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
