'use client';

import { useEffect, useRef, useState } from 'react';
import { MathfieldElement } from 'mathlive';

interface MathInputProps {
    value: string;
    onChange: (latex: string) => void;
    disabled?: boolean;
}

export default function MathInput({ value, onChange, disabled }: MathInputProps) {
    const mfRef = useRef<MathfieldElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Dynamically import mathlive to ensure it only runs on client
        import('mathlive').then(() => {
            // Custom element registration happens automatically on import
        });
    }, []);

    useEffect(() => {
        const mf = mfRef.current;
        if (mf) {
            // Only update if value changed externally to avoid cursor jumping
            if (mf.value !== value) {
                mf.value = value;
            }
        }
    }, [value]);

    useEffect(() => {
        const mf = mfRef.current;
        if (mf) {
            mf.readOnly = !!disabled;
        }
    }, [disabled]);

    // Handle input event
    useEffect(() => {
        const mf = mfRef.current;
        if (!mf) return;

        const onInput = () => {
            onChange(mf.value);
        };

        mf.addEventListener('input', onInput);
        return () => {
            mf.removeEventListener('input', onInput);
        };
    }, [onChange, mounted]); // Dependency on mounted to re-attach if needed? No, ref stays.

    if (!mounted) {
        return (
            <div className="p-1 border-2 rounded-lg border-slate-200 bg-slate-50 h-[50px] animate-pulse"></div>
        );
    }

    return (
        <div className={`p-1 border-2 rounded-lg transition-all ${disabled
            ? 'border-slate-200 bg-slate-100 opacity-80'
            : 'border-blue-200 focus-within:border-blue-500 bg-white'
            }`}>
            {/* @ts-ignore */}
            <math-field
                ref={mfRef}
                style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '1.2rem',
                    borderRadius: '4px',
                    border: 'none',
                    outline: 'none'
                }}
            >
                {value}
                {/* @ts-ignore */}
            </math-field>
        </div>
    );
}
