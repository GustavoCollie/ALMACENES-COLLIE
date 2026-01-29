import React, { useState } from 'react';
import {
    Users,
    ShoppingCart,
    TrendingDown,
    Clock,
    AlertTriangle,
    Plus,
    CheckCircle,
    XCircle,
    Truck,
    DollarSign
} from 'lucide-react';

export const PurchasingDashboard = ({
    suppliers,
    orders,
    kpis,
    loading,
    onAddOrder,
    onAddSupplier,
    onUpdateOrderStatus
}) => {
    if (loading && !kpis) {
        return <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-100 rounded-3xl"></div>)}
            </div>
        </div>;
    }

    const kpiCards = [
        {
            title: "Calidad (Tasa de Rechazo)",
            value: `${kpis?.quality_rate.toFixed(1)}%`,
            icon: AlertTriangle,
            color: kpis?.quality_rate > 10 ? "text-rose-600" : "text-emerald-600",
            bg: kpis?.quality_rate > 10 ? "bg-rose-50" : "bg-emerald-50",
            description: "Porcentaje de pedidos con defectos"
        },
        {
            title: "Coste Adquisición (CTA)",
            value: `$${parseFloat(kpis?.total_cta || 0).toLocaleString()}`,
            icon: DollarSign,
            color: "text-blue-600",
            bg: "bg-blue-50",
            description: "Valor total de compras realizadas"
        },
        {
            title: "Ahorro Total",
            value: `$${parseFloat(kpis?.total_savings || 0).toLocaleString()}`,
            icon: TrendingDown,
            color: "text-amber-600",
            bg: "bg-amber-50",
            description: "Ahorro por negociaciones/descuentos"
        },
        {
            title: "Cumplimiento de Plazos",
            value: `${kpis?.on_time_delivery_rate.toFixed(1)}%`,
            icon: Clock,
            color: kpis?.on_time_delivery_rate < 90 ? "text-orange-600" : "text-emerald-600",
            bg: kpis?.on_time_delivery_rate < 90 ? "bg-orange-50" : "bg-emerald-50",
            description: "Pedidos entregados a tiempo"
        }
    ];

    return (
        <div className="space-y-10 animate-fade-in">
            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiCards.map((card, idx) => (
                    <div key={idx} className={`${card.bg} p-8 rounded-[2.5rem] border border-white shadow-sm transition-all hover:shadow-md group`}>
                        <div className="flex items-center justify-between mb-6">
                            <div className={`${card.color} p-3 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform`}>
                                <card.icon size={24} />
                            </div>
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">KPI</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{card.title}</h3>
                        <p className={`text-3xl font-black ${card.color} tracking-tight`}>{card.value}</p>
                        <p className="text-xs text-slate-400 font-medium mt-4">{card.description}</p>
                    </div>
                ))}
            </div>

            {/* Actions Section */}
            <div className="flex flex-col md:flex-row gap-4">
                <button
                    onClick={onAddOrder}
                    className="flex-1 flex items-center justify-center space-x-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-5 rounded-3xl font-black shadow-xl transition-all active:scale-95"
                >
                    <ShoppingCart size={22} />
                    <span className="tracking-widest uppercase">Registrar Orden de Compra</span>
                </button>
                <button
                    onClick={onAddSupplier}
                    className="flex-1 flex items-center justify-center space-x-3 bg-white border-2 border-slate-200 hover:border-slate-900 text-slate-900 px-8 py-5 rounded-3xl font-black transition-all active:scale-95"
                >
                    <Users size={22} />
                    <span className="tracking-widest uppercase">Gestionar Proveedores</span>
                </button>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-[3rem] border-2 border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Órdenes de Compra Recientes</h2>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Historial y seguimiento de pedidos</p>
                    </div>
                    <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {orders.length} TOTAL
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID/Fecha</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Proveedor</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Producto</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Monto</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Estado</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <span className="block text-sm font-black text-slate-900">OC-{order.id.substring(0, 6)}</span>
                                        <span className="block text-[10px] text-slate-400 font-bold mt-1 tracking-wider uppercase">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                                                <Users size={14} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">{order.supplier_id.substring(0, 8)}...</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-bold text-slate-700">{order.product_id.substring(0, 8)}...</span>
                                        <span className="block text-[10px] text-slate-400 font-bold mt-1">CANT: {order.quantity}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-black text-slate-900">${parseFloat(order.total_amount).toLocaleString()}</span>
                                        {parseFloat(order.savings_amount) > 0 && (
                                            <span className="block text-[10px] text-emerald-600 font-black mt-1 uppercase">AHORRO: ${order.savings_amount}</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-8 py-6">
                                        {order.status === 'PENDING' && (
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => onUpdateOrderStatus(order.id, 'RECEIVED')}
                                                    className="p-2 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                                    title="Marcar como Recibido"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button
                                                    onClick={() => onUpdateOrderStatus(order.id, 'REJECTED')}
                                                    className="p-2 bg-rose-100 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                                    title="Rechazar Pedido"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </div>
                                        )}
                                        {order.status !== 'PENDING' && (
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Completado</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="bg-slate-50 p-6 rounded-full mb-4">
                                                <ShoppingCart size={40} className="text-slate-300" />
                                            </div>
                                            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No hay órdenes registradas</p>
                                            <button onClick={onAddOrder} className="mt-4 text-emerald-600 font-bold text-xs hover:underline uppercase tracking-widest">Crear mi primera orden</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        PENDING: "bg-amber-100 text-amber-700 border-amber-200",
        RECEIVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
        REJECTED: "bg-rose-100 text-rose-700 border-rose-200",
    };

    const labels = {
        PENDING: "PENDIENTE",
        RECEIVED: "RECIBIDO",
        REJECTED: "RECHAZADO",
    };

    return (
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};
