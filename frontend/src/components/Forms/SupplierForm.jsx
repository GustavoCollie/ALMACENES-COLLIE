import React, { useState } from 'react';
import { X, Users, Mail, Phone, Plus } from 'lucide-react';

export const SupplierForm = ({ onClose, onSubmit, loading, suppliers }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', email: '', phone: '' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center space-x-4">
                        <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg">
                            <Users size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Gestión de Proveedores</h2>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Directorio de contacto para compras</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <X size={24} className="text-slate-400" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {/* New Supplier Form */}
                    <form onSubmit={handleSubmit} className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 space-y-4">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Añadir Nuevo Proveedor</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nombre Comercial</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="Ej: Distribuidora Global"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email de Contacto</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="compras@proveedor.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Teléfono / WhatsApp</label>
                                <input
                                    type="text"
                                    className="w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="+51 987 654 321"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-xl font-black text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            <Plus size={16} />
                            <span>{loading ? 'Guardando...' : 'Registrar Proveedor'}</span>
                        </button>
                    </form>

                    {/* Supplier List */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Proveedores Registrados</h3>
                        <div className="divide-y divide-slate-100 border border-slate-100 rounded-[2rem] overflow-hidden bg-white shadow-sm">
                            {suppliers.map((s) => (
                                <div key={s.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-black text-lg">
                                            {s.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900 tracking-tight">{s.name}</h4>
                                            <div className="flex items-center space-x-4 mt-1">
                                                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                                    <Mail size={12} /> {s.email}
                                                </span>
                                                {s.phone && (
                                                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                                        <Phone size={12} /> {s.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {suppliers.length === 0 && (
                                <div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                                    No hay proveedores registrados
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full px-8 py-4 rounded-2xl text-sm font-black text-slate-900 bg-white border-2 border-slate-200 hover:border-slate-400 transition-all uppercase tracking-widest shadow-sm"
                    >
                        Cerrar Ventana
                    </button>
                </div>
            </div>
        </div>
    );
};
