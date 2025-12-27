'use client';

import React from 'react';

export default function GettingStartedTab() {
    return (
        <div className="p-6 max-w-4xl" style={{ background: 'var(--vscode-editor-bg)' }}>
            <div className="prose prose-invert max-w-none">
                <h1 className="text-2xl font-bold text-white mb-6 pb-2 border-b" style={{ borderColor: 'var(--vscode-border)' }}>
                    🚀 Getting Started
                </h1>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Welcome to My Portfolio!</h2>
                    <p style={{ color: 'var(--vscode-text)' }}>
                        This portfolio is designed to look and feel exactly like VS Code. Here&apos;s how to navigate around:
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">📁 File Explorer</h2>
                    <div className="space-y-2" style={{ color: 'var(--vscode-text)' }}>
                        <p>• Click on folders to expand/collapse them</p>
                        <p>• Click on files to open them in the editor</p>
                        <p>• Use the search bar (Ctrl+P) to quickly find files</p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">🔧 Activity Bar (Left Icons)</h2>
                    <div className="grid grid-cols-2 gap-4" style={{ color: 'var(--vscode-text)' }}>
                        <div className="p-3 rounded" style={{ background: 'var(--vscode-sidebar-bg)' }}>
                            <strong className="text-white">📂 Explorer</strong>
                            <p className="text-sm mt-1">Browse portfolio files</p>
                        </div>
                        <div className="p-3 rounded" style={{ background: 'var(--vscode-sidebar-bg)' }}>
                            <strong className="text-white">🔍 Search</strong>
                            <p className="text-sm mt-1">Search content</p>
                        </div>
                        <div className="p-3 rounded" style={{ background: 'var(--vscode-sidebar-bg)' }}>
                            <strong className="text-white">🔀 Git</strong>
                            <p className="text-sm mt-1">View source control</p>
                        </div>
                        <div className="p-3 rounded" style={{ background: 'var(--vscode-sidebar-bg)' }}>
                            <strong className="text-white">🧩 Extensions</strong>
                            <p className="text-sm mt-1">View my skills</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">💻 Terminal</h2>
                    <p style={{ color: 'var(--vscode-text)' }} className="mb-4">
                        Open the terminal from the menu bar or status bar. Type <code className="px-2 py-1 rounded" style={{ background: 'var(--vscode-sidebar-bg)', color: '#CE9178' }}>help</code> to see all available commands!
                    </p>
                    <div className="p-4 rounded font-mono text-sm" style={{ background: 'var(--vscode-sidebar-bg)' }}>
                        <p style={{ color: '#22c55e' }}>$ help</p>
                        <p style={{ color: 'var(--vscode-text-muted)' }}>See terminal-commands.md for full list</p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">⌨️ Quick Tips</h2>
                    <ul className="space-y-2" style={{ color: 'var(--vscode-text)' }}>
                        <li>• Press <kbd className="px-2 py-1 rounded text-xs" style={{ background: 'var(--vscode-sidebar-bg)' }}>Ctrl+P</kbd> to quick search files</li>
                        <li>• Press <kbd className="px-2 py-1 rounded text-xs" style={{ background: 'var(--vscode-sidebar-bg)' }}>Ctrl+`</kbd> to toggle terminal</li>
                        <li>• Click tabs to switch between open files</li>
                        <li>• Click the X on tabs to close them</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
