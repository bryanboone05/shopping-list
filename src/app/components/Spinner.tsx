'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface SpinnerProps {
    show?: boolean;
    label?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ show = true, label }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!show || !mounted) {
        return null;
    }

    return createPortal(
        <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-teal-900/20 backdrop-blur-sm">
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-full border-4 border-teal-200/60">
                <span className="h-16 w-16 rounded-full border-4 border-teal-200 border-t-teal-600 animate-spin" />
            </span>
            {label ? <p className="mt-4 text-sm font-medium text-teal-700">{label}</p> : null}
        </div>,
        document.body
    );
};

export default Spinner;
