'use client';

import React from 'react';
import { useVSCode } from '@/context/VSCodeContext';

const shortcuts = [
    { action: 'Show All Commands', key: 'Ctrl+Shift+P' },
    { action: 'Go to File', key: 'Ctrl+P' },
    { action: 'Find in Files', key: 'Ctrl+Shift+F' },
    { action: 'Open Terminal', key: 'Ctrl+`' },
    { action: 'Toggle Sidebar', key: 'Ctrl+B' },
    { action: 'Open Settings', key: 'Ctrl+,' },
];

const quickActions = [
    { label: 'About Me', file: 'about.tsx', icon: '👤' },
    { label: 'Projects', file: 'project1.tsx', icon: '🚀' },
    { label: 'Experience', file: 'experience.tsx', icon: '💼' },
    { label: 'Contact', file: 'contact.tsx', icon: '📧' },
];

export default function WelcomeTab() {
    const { openTab, setTerminalVisible } = useVSCode();

    const handleQuickAction = (action: typeof quickActions[0]) => {
        openTab({
            id: action.file,
            name: action.file.charAt(0).toUpperCase() + action.file.slice(1),
            icon: action.file.split('.').pop() || 'file',
            type: 'file',
            path: action.file,
        });
    };

    return (
        <div className="welcome-container">
            {/* VS Code Logo */}
            <div className="mb-8">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="opacity-80">
                    <path d="M95 18.5L77 10.5L68.5 25.5L95 18.5Z" fill="#0065A9" />
                    <path d="M77 10.5L25 55L5 40L25 80L77 90L95 82V18.5L77 10.5Z" fill="#007ACC" />
                    <path d="M77 10.5V90L95 82V18.5L77 10.5Z" fill="#1F9CF0" />
                    <path d="M25 55L5 40V60L25 80L77 90V10.5L25 55Z" fill="#0065A9" fillOpacity="0.8" />
                </svg>
            </div>

            <h1 className="welcome-title">Welcome to My Portfolio</h1>
            <p className="welcome-subtitle">
                Full Stack Developer | Open Source Enthusiast | Problem Solver
            </p>

            {/* Quick Actions */}
            <div className="flex gap-4 mb-10">
                {quickActions.map((action, index) => (
                    <button
                        key={index}
                        onClick={() => handleQuickAction(action)}
                        className="flex flex-col items-center gap-2 px-6 py-4 rounded-lg transition-all hover:scale-105"
                        style={{
                            background: 'var(--vscode-sidebar-bg)',
                            border: '1px solid var(--vscode-border)'
                        }}
                    >
                        <span className="text-2xl">{action.icon}</span>
                        <span className="text-sm">{action.label}</span>
                    </button>
                ))}
            </div>

            {/* Keyboard Shortcuts */}
            <div className="w-full max-w-md">
                <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--vscode-text-muted)' }}>
                    Keyboard Shortcuts
                </h3>
                <div className="shortcut-grid">
                    {shortcuts.map((shortcut, index) => (
                        <div key={index} className="shortcut-item">
                            <span style={{ color: 'var(--vscode-text-muted)' }}>{shortcut.action}</span>
                            <span className="shortcut-key">{shortcut.key}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Terminal Hint */}
            <div className="mt-8 text-sm" style={{ color: 'var(--vscode-text-muted)' }}>
                <button
                    onClick={() => setTerminalVisible(true)}
                    className="hover:underline"
                    style={{ color: 'var(--vscode-accent)' }}
                >
                    Open Terminal
                </button>
                {' '}to run interactive commands like{' '}
                <code className="px-1 rounded" style={{ background: 'var(--vscode-sidebar-bg)' }}>
                    help
                </code>
                ,{' '}
                <code className="px-1 rounded" style={{ background: 'var(--vscode-sidebar-bg)' }}>
                    about
                </code>
                , or{' '}
                <code className="px-1 rounded" style={{ background: 'var(--vscode-sidebar-bg)' }}>
                    projects
                </code>
            </div>
        </div>
    );
}
