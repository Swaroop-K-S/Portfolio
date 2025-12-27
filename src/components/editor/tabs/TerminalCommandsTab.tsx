'use client';

import React from 'react';
import { Terminal, Folder, FileText, ExternalLink, Mail, Download } from 'lucide-react';

interface Command {
    command: string;
    description: string;
    example?: string;
    category: string;
}

const commands: Command[] = [
    // Navigation
    { command: 'open <page>', description: 'Open a page in the editor', example: 'open about', category: 'Navigation' },
    { command: 'cd <folder>', description: 'Navigate to a folder', example: 'cd projects', category: 'Navigation' },
    { command: 'ls', description: 'List all files and folders', category: 'Navigation' },
    { command: 'tree', description: 'Show folder structure as tree', category: 'Navigation' },

    // View
    { command: 'about', description: 'View about info & open About.tsx', category: 'View' },
    { command: 'skills', description: 'View skills & open skills.json', category: 'View' },
    { command: 'projects', description: 'View projects & open Project1.tsx', category: 'View' },
    { command: 'experience', description: 'View experience & open Experience.tsx', category: 'View' },
    { command: 'contact', description: 'View contact & open Contact.tsx', category: 'View' },
    { command: 'extensions', description: 'Open Extensions panel (skills)', category: 'View' },

    // Actions
    { command: 'resume', description: 'Download resume PDF', category: 'Actions' },
    { command: 'github', description: 'Open GitHub profile in new tab', category: 'Actions' },
    { command: 'linkedin', description: 'Open LinkedIn profile in new tab', category: 'Actions' },
    { command: 'email', description: 'Copy email address to clipboard', category: 'Actions' },

    // System
    { command: 'help', description: 'Show all available commands', category: 'System' },
    { command: 'clear', description: 'Clear the terminal', category: 'System' },
    { command: 'history', description: 'Show command history', category: 'System' },
    { command: 'whoami', description: 'Display user profile', category: 'System' },
    { command: 'date', description: 'Show current date and time', category: 'System' },
    { command: 'echo <text>', description: 'Print text to terminal', example: 'echo Hello!', category: 'System' },
    { command: 'exit', description: 'Close the terminal', category: 'System' },

    // Fun
    { command: 'neofetch', description: 'Display system info (ASCII art)', category: 'Fun' },
    { command: 'install <skill>', description: '"Install" a new skill', example: 'install rust', category: 'Fun' },
    { command: 'sudo', description: 'Easter egg 😄', category: 'Fun' },
    { command: 'rm', description: 'Easter egg 😄', category: 'Fun' },
];

const categories = ['Navigation', 'View', 'Actions', 'System', 'Fun'];

const categoryIcons: Record<string, React.ReactNode> = {
    Navigation: <Folder size={16} />,
    View: <FileText size={16} />,
    Actions: <ExternalLink size={16} />,
    System: <Terminal size={16} />,
    Fun: <span>🎮</span>,
};

export default function TerminalCommandsTab() {
    return (
        <div className="p-6 max-w-4xl" style={{ background: 'var(--vscode-editor-bg)' }}>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Terminal size={28} />
                Terminal Commands
            </h1>
            <p className="mb-6" style={{ color: 'var(--vscode-text-muted)' }}>
                All available commands for the interactive terminal
            </p>

            {categories.map(category => (
                <section key={category} className="mb-8">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 pb-2 border-b" style={{ borderColor: 'var(--vscode-border)' }}>
                        {categoryIcons[category]}
                        {category}
                    </h2>

                    <div className="space-y-2">
                        {commands
                            .filter(cmd => cmd.category === category)
                            .map((cmd, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-3 rounded hover:bg-[var(--vscode-list-hover)] transition-colors"
                                    style={{ background: 'var(--vscode-sidebar-bg)' }}
                                >
                                    <code
                                        className="px-2 py-1 rounded text-sm font-mono flex-shrink-0 min-w-[140px]"
                                        style={{ background: 'var(--vscode-editor-bg)', color: '#4ade80' }}
                                    >
                                        {cmd.command}
                                    </code>
                                    <div className="flex-1">
                                        <p style={{ color: 'var(--vscode-text)' }}>{cmd.description}</p>
                                        {cmd.example && (
                                            <p className="text-xs mt-1" style={{ color: 'var(--vscode-text-muted)' }}>
                                                Example: <code style={{ color: '#CE9178' }}>{cmd.example}</code>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            ))}

            <section className="mt-8 p-4 rounded" style={{ background: 'var(--vscode-sidebar-bg)', border: '1px solid var(--vscode-border)' }}>
                <h3 className="text-white font-semibold mb-3">💡 Pro Tips</h3>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--vscode-text)' }}>
                    <li>• Use <kbd className="px-1 rounded" style={{ background: 'var(--vscode-editor-bg)' }}>↑</kbd> / <kbd className="px-1 rounded" style={{ background: 'var(--vscode-editor-bg)' }}>↓</kbd> to navigate command history</li>
                    <li>• Use <kbd className="px-1 rounded" style={{ background: 'var(--vscode-editor-bg)' }}>Ctrl+L</kbd> to clear the terminal quickly</li>
                    <li>• Commands are case-insensitive</li>
                    <li>• Type <code style={{ color: '#4ade80' }}>help</code> anytime to see this list in the terminal</li>
                </ul>
            </section>
        </div>
    );
}
