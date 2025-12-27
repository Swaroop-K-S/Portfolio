'use client';

import React from 'react';
import { useVSCode } from '@/context/VSCodeContext';
import EditorTabs from './EditorTabs';
import EditorContent from './EditorContent';

export default function EditorArea() {
    const { openTabs, activeTabId } = useVSCode();

    if (openTabs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full" style={{ background: 'var(--vscode-editor-bg)' }}>
                <div className="text-6xl mb-4 opacity-20">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M95 18.5L77 10.5L68.5 25.5L95 18.5Z" />
                        <path d="M77 10.5L25 55L5 40L25 80L77 90L95 82V18.5L77 10.5Z" />
                        <path d="M77 10.5V90L95 82V18.5L77 10.5Z" />
                        <path d="M25 55L5 40V60L25 80L77 90V10.5L25 55Z" fillOpacity="0.5" />
                    </svg>
                </div>
                <p style={{ color: 'var(--vscode-text-muted)' }}>
                    Open a file from the explorer to get started
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full" style={{ background: 'var(--vscode-editor-bg)' }}>
            <EditorTabs />
            <EditorContent />
        </div>
    );
}
