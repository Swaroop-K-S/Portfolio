'use client';

import React from 'react';
import { Keyboard } from 'lucide-react';

interface Shortcut {
    keys: string[];
    description: string;
    category: string;
}

const shortcuts: Shortcut[] = [
    // Navigation
    { keys: ['Ctrl', 'P'], description: 'Quick search files', category: 'Navigation' },
    { keys: ['Ctrl', 'Shift', 'E'], description: 'Focus file explorer', category: 'Navigation' },
    { keys: ['Ctrl', 'Shift', 'F'], description: 'Open search panel', category: 'Navigation' },
    { keys: ['Ctrl', 'Shift', 'G'], description: 'Open source control', category: 'Navigation' },
    { keys: ['Ctrl', 'Shift', 'X'], description: 'Open extensions', category: 'Navigation' },

    // Editor
    { keys: ['Ctrl', 'W'], description: 'Close current tab', category: 'Editor' },
    { keys: ['Ctrl', 'Tab'], description: 'Switch to next tab', category: 'Editor' },
    { keys: ['Ctrl', 'Shift', 'Tab'], description: 'Switch to previous tab', category: 'Editor' },
    { keys: ['Ctrl', 'B'], description: 'Toggle sidebar visibility', category: 'Editor' },

    // Terminal
    { keys: ['Ctrl', '`'], description: 'Toggle terminal', category: 'Terminal' },
    { keys: ['Ctrl', 'L'], description: 'Clear terminal (when focused)', category: 'Terminal' },
    { keys: ['↑', '↓'], description: 'Navigate command history', category: 'Terminal' },
    { keys: ['Escape'], description: 'Close search modal', category: 'Terminal' },

    // General
    { keys: ['Ctrl', ','], description: 'Open settings', category: 'General' },
    { keys: ['F11'], description: 'Toggle fullscreen', category: 'General' },
];

const categories = ['Navigation', 'Editor', 'Terminal', 'General'];

export default function KeyboardShortcutsTab() {
    return (
        <div className="p-6 max-w-4xl" style={{ background: 'var(--vscode-editor-bg)' }}>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Keyboard size={28} />
                Keyboard Shortcuts
            </h1>
            <p className="mb-6" style={{ color: 'var(--vscode-text-muted)' }}>
                Master these shortcuts to navigate like a pro
            </p>

            {categories.map(category => (
                <section key={category} className="mb-8">
                    <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b" style={{ borderColor: 'var(--vscode-border)' }}>
                        {category}
                    </h2>

                    <div className="space-y-2">
                        {shortcuts
                            .filter(s => s.category === category)
                            .map((shortcut, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded hover:bg-[var(--vscode-list-hover)] transition-colors"
                                    style={{ background: 'var(--vscode-sidebar-bg)' }}
                                >
                                    <span style={{ color: 'var(--vscode-text)' }}>{shortcut.description}</span>
                                    <div className="flex items-center gap-1">
                                        {shortcut.keys.map((key, keyIndex) => (
                                            <React.Fragment key={keyIndex}>
                                                <kbd
                                                    className="px-2 py-1 rounded text-sm font-mono min-w-[30px] text-center"
                                                    style={{
                                                        background: 'var(--vscode-editor-bg)',
                                                        border: '1px solid var(--vscode-border)',
                                                        color: 'var(--vscode-accent)'
                                                    }}
                                                >
                                                    {key}
                                                </kbd>
                                                {keyIndex < shortcut.keys.length - 1 && (
                                                    <span style={{ color: 'var(--vscode-text-muted)' }}>+</span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            ))}

            <section className="mt-8 p-4 rounded" style={{ background: 'var(--vscode-sidebar-bg)', border: '1px solid var(--vscode-accent)' }}>
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    ⚡ Most Used
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                        <span style={{ color: 'var(--vscode-text)' }}>Search files</span>
                        <kbd className="px-2 py-1 rounded text-xs" style={{ background: 'var(--vscode-editor-bg)', color: 'var(--vscode-accent)' }}>Ctrl+P</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                        <span style={{ color: 'var(--vscode-text)' }}>Toggle terminal</span>
                        <kbd className="px-2 py-1 rounded text-xs" style={{ background: 'var(--vscode-editor-bg)', color: 'var(--vscode-accent)' }}>Ctrl+`</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                        <span style={{ color: 'var(--vscode-text)' }}>Toggle sidebar</span>
                        <kbd className="px-2 py-1 rounded text-xs" style={{ background: 'var(--vscode-editor-bg)', color: 'var(--vscode-accent)' }}>Ctrl+B</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                        <span style={{ color: 'var(--vscode-text)' }}>Close tab</span>
                        <kbd className="px-2 py-1 rounded text-xs" style={{ background: 'var(--vscode-editor-bg)', color: 'var(--vscode-accent)' }}>Ctrl+W</kbd>
                    </div>
                </div>
            </section>
        </div>
    );
}
