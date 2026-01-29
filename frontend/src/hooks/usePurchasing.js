import { useState, useEffect } from 'react';
import { purchasingService } from '../services/api';

export const usePurchasing = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [kpis, setKpis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [suppliersRes, ordersRes, kpisRes] = await Promise.all([
                purchasingService.getSuppliers(),
                purchasingService.getOrders(),
                purchasingService.getKPIs()
            ]);
            setSuppliers(suppliersRes.data);
            setOrders(ordersRes.data);
            setKpis(kpisRes.data);
            setError(null);
        } catch (err) {
            setError('Error al cargar datos de compras.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createSupplier = async (data) => {
        const res = await purchasingService.createSupplier(data);
        setSuppliers(prev => [...prev, res.data]);
        return res.data;
    };

    const createOrder = async (data) => {
        const res = await purchasingService.createOrder(data);
        setOrders(prev => [res.data, ...prev]);
        fetchData(); // Refresh KPIs
        return res.data;
    };

    const updateOrder = async (id, data) => {
        const res = await purchasingService.updateOrder(id, data);
        setOrders(prev => prev.map(o => o.id === id ? res.data : o));
        fetchData(); // Refresh KPIs
        return res.data;
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        suppliers,
        orders,
        kpis,
        loading,
        error,
        refresh: fetchData,
        createSupplier,
        createOrder,
        updateOrder
    };
};
