import * as React from 'react';
import { useEffect, useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

/**
 * Modal component.
 */
export function Modal({ isOpen, onClose, children }: ModalProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            const timer = setTimeout(() => {
                setShow(false);
            }, 200); // igual al tiempo de animación CSS
            return () => {
                clearTimeout(timer);
            };
        }
    }, [isOpen]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div
                className={`bg-surface rounded-xl p-6 max-w-md w-full border border-border shadow-xl ${isOpen ? 'modal-animate-in' : 'modal-animate-out'}`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    );
}
