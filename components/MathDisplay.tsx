'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathDisplayProps {
    latex: string;
    block?: boolean;
}

export default function MathDisplay({ latex, block = false }: MathDisplayProps) {
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            try {
                katex.render(latex, containerRef.current, {
                    throwOnError: false,
                    displayMode: block,
                });
            } catch (e) {
                console.error('KaTeX error:', e);
                containerRef.current.innerText = latex;
            }
        }
    }, [latex, block]);

    return <span ref={containerRef} />;
}
