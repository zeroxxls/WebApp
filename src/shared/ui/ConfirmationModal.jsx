import React from 'react';

export const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl max-w-sm w-full text-center">
                <p className="text-white text-lg mb-6">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                       Yes
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};