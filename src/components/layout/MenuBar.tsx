'use client';

import React, { useState, useEffect } from 'react';
import { useVSCode } from '@/context/VSCodeContext';
import { Search } from 'lucide-react';
import QuickSearch from './QuickSearch';

const menuItems = [
    { label: 'File', shortcut: 'Alt+F' },
    { label: 'Edit', shortcut: 'Alt+E' },
    { label: 'Selection', shortcut: 'Alt+S' },
    { label: 'View', shortcut: 'Alt+V' },
    { label: 'Go', shortcut: 'Alt+G' },
    { label: 'Run', shortcut: 'Alt+R' },
    { label: 'Terminal', shortcut: 'Alt+T' },
    { label: 'Help', shortcut: 'Alt+H' },
];

export default function MenuBar() {
    const { terminalVisible, setTerminalVisible } = useVSCode();
    const [searchOpen, setSearchOpen] = useState(false);

    // Keyboard shortcut: Ctrl+P to open search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                setSearchOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleMenuClick = (label: string) => {
        if (label === 'Terminal') {
            setTerminalVisible(!terminalVisible);
        } else if (label === 'Go') {
            setSearchOpen(true);
        }
    };

    return (
        <>
            <div
                className="flex items-center h-[30px] px-2 select-none"
                style={{ background: 'var(--vscode-menubar-bg)' }}
            >
                {/* VS Code Icon */}
                <div className="flex items-center justify-center w-[40px] h-full">
                    <svg width="16" height="16" viewBox="0 0 100 100" fill="none">
                        <path d="M95 18.5L77 10.5L68.5 25.5L95 18.5Z" fill="#0065A9" />
                        <path d="M77 10.5L25 55L5 40L25 80L77 90L95 82V18.5L77 10.5Z" fill="#007ACC" />
                        <path d="M77 10.5V90L95 82V18.5L77 10.5Z" fill="#1F9CF0" />
                        <path d="M25 55L5 40V60L25 80L77 90V10.5L25 55Z" fill="#0065A9" fillOpacity="0.8" />
                    </svg>
                </div>

                {/* Menu Items */}
                <div className="flex items-center">
                    {menuItems.map((item) => (
                        <div
                            key={item.label}
                            className="menu-item"
                            onClick={() => handleMenuClick(item.label)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>

                {/* Search Bar in Center */}
                <div className="flex-1 flex justify-center">
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="flex items-center gap-2 px-4 py-1 rounded-md text-xs transition-colors hover:bg-[var(--vscode-hover)]"
                        style={{
                            background: 'var(--vscode-editor-bg)',
                            border: '1px solid var(--vscode-border)',
                            color: 'var(--vscode-text-muted)',
                            minWidth: '300px'
                        }}
                    >
                        <Search size={12} />
                        <span>Search files (Ctrl+P)</span>
                    </button>
                </div>

                {/* Window Controls */}
                <div className="flex items-center gap-0">
                    <button className="flex items-center justify-center w-[46px] h-[30px] hover:bg-[#404040] transition-colors">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                            <rect y="4" width="10" height="1" />
                        </svg>
                    </button>
                    <button className="flex items-center justify-center w-[46px] h-[30px] hover:bg-[#404040] transition-colors">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor">
                            <rect x="0.5" y="0.5" width="9" height="9" />
                        </svg>
                    </button>
                    <button className="flex items-center justify-center w-[46px] h-[30px] hover:bg-[#e81123] transition-colors">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Quick Search Modal */}
            <QuickSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
