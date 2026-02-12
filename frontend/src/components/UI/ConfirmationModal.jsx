import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#202124]/40 backdrop-blur-[2px] animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] overflow-hidden animate-scale-in">
                <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="p-3 bg-[#fce8e6] text-[#d93025] rounded-xl">
                            <AlertCircle size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-[#202124]">{title}</h3>
                            <p className="text-[11px] text-[#d93025] font-bold uppercase tracking-wider mt-0.5">Acción Crítica</p>
                        </div>
                    </div>

                    <p className="text-[#5f6368] text-sm leading-relaxed mb-8">
                        {message}
                    </p>

                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-medium text-[#5f6368] hover:bg-[#f1f3f4] transition-all font-['Outfit']"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            className="w-full sm:w-auto px-8 py-2.5 rounded-full text-sm font-medium text-white bg-[#d93025] hover:bg-[#c5221f] transition-all shadow-md active:scale-95 font-['Outfit']"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
