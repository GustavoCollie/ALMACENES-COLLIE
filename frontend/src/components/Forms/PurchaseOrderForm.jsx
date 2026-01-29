import React, { useState } from 'react';
import { X, ShoppingCart, Calendar, DollarSign, Package, Users } from 'lucide-react';

export const PurchaseOrderForm = ({ suppliers, products, onClose, onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        supplier_id: '',
        product_id: '',
        quantity: 1,
        unit_price: 0,
        savings_amount: 0,
        expected_delivery_date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-slide-up">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center space-x-4">
                        <div className="bg-slate-900 p-3 rounded-2xl shadow-lg">
                            <ShoppingCart size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Nueva Orden de Compra</h2>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Registrar pedido a proveedor</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <X size={24} className="text-slate-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Users size={14} /> Proveedor
                            </label>
                            <select
                                required
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all"
                                value={formData.supplier_id}
                                onChange={e => setFormData({ ...formData, supplier_id: e.target.value })}
                            >
                                <option value="">Seleccionar Proveedor</option>
                                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Package size={14} /> Producto
                            </label>
                            <select
                                required
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all"
                                value={formData.product_id}
                                onChange={e => setFormData({ ...formData, product_id: e.target.value })}
                            >
                                <option value="">Seleccionar Producto</option>
                                {products.map(p => <option key={p.id} value={p.id}>{p.name} (SKU: {p.sku})</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                Cantidad
                            </label>
                            <input
                                type="number"
                                required
                                min="1"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all"
                                value={formData.quantity}
                                onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <DollarSign size={14} /> Precio Unitario
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all"
                                value={formData.unit_price}
                                onChange={e => setFormData({ ...formData, unit_price: parseFloat(e.target.value) })}
                            />
                        </div>

                        <div className="space-y-2 text-emerald-600">
                            <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                <TrendingDown size={14} /> Ahorro Negociado
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                className="w-full bg-emerald-50 border-2 border-emerald-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                                value={formData.savings_amount}
                                onChange={e => setFormData({ ...formData, savings_amount: parseFloat(e.target.value) })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Calendar size={14} /> Fecha Entrega Estimada
                            </label>
                            <input
                                type="date"
                                required
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all"
                                value={formData.expected_delivery_date}
                                onChange={e => setFormData({ ...formData, expected_delivery_date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-8 py-4 rounded-2xl text-sm font-black text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl text-sm font-black shadow-xl transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest"
                        >
                            {loading ? 'Procesando...' : 'Crear Orden de Compra'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const TrendingDown = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m22 17-6-6-4 4-8-8" />
        <polyline points="16 17 22 17 22 11" />
    </svg>
);
