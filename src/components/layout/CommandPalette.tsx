'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useVSCode, Tab } from '@/context/VSCodeContext';
import {
    Search, Terminal, Files, Settings, User,
    FolderOpen, Mail, Github, Linkedin, Download,
    Keyboard, HelpCircle, Palette, X, ChevronRight
} from 'lucide-react';

interface Command {
    id: string;
    label: string;
    description?: string;
    icon: React.ReactNode;
    category: string;
    shortcut?: string;
    action: () => void;
}

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const {
        openTab,
        setTerminalVisible,
        setActiveSidebarPanel,
        terminalVisible
    } = useVSCode();

    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const openFile = (id: string, name: string, extension: string) => {
        const tab: Tab = { id, name, icon: extension, type: 'file', path: id };
        openTab(tab);
        onClose();
    };

    const commands: Command[] = [
        // Navigation
        {
            id: 'open-about',
            label: 'Open About',
            description: 'View about information',
            icon: <User size={16} />,
            category: 'Navigation',
            action: () => openFile('about.tsx', 'About.tsx', 'tsx')
        },
        {
            id: 'open-projects',
            label: 'Open Projects',
            description: 'View my projects',
            icon: <FolderOpen size={16} />,
            category: 'Navigation',
            action: () => openFile('project1.tsx', 'Project1.tsx', 'tsx')
        },
        {
            id: 'open-contact',
            label: 'Open Contact',
            description: 'Get in touch',
            icon: <Mail size={16} />,
            category: 'Navigation',
            action: () => openFile('contact.tsx', 'Contact.tsx', 'tsx')
        },
        {
            id: 'open-experience',
            label: 'Open Experience',
            description: 'View work experience',
            icon: <Files size={16} />,
            category: 'Navigation',
            action: () => openFile('experience.tsx', 'Experience.tsx', 'tsx')
        },
        {
            id: 'open-skills',
            label: 'Open Skills',
            description: 'View technical skills',
            icon: <Settings size={16} />,
            category: 'Navigation',
            action: () => openFile('skills.json', 'skills.json', 'json')
        },

        // Panels
        {
            id: 'toggle-terminal',
            label: terminalVisible ? 'Hide Terminal' : 'Show Terminal',
            description: 'Toggle integrated terminal',
            icon: <Terminal size={16} />,
            category: 'View',
            shortcut: 'Ctrl+`',
            action: () => { setTerminalVisible(!terminalVisible); onClose(); }
        },
        {
            id: 'show-explorer',
            label: 'Show Explorer',
            description: 'Open file explorer sidebar',
            icon: <Files size={16} />,
            category: 'View',
            shortcut: 'Ctrl+Shift+E',
            action: () => { setActiveSidebarPanel('explorer'); onClose(); }
        },
        {
            id: 'show-search',
            label: 'Show Search',
            description: 'Open search sidebar',
            icon: <Search size={16} />,
            category: 'View',
            shortcut: 'Ctrl+Shift+F',
            action: () => { setActiveSidebarPanel('search'); onClose(); }
        },
        {
            id: 'show-extensions',
            label: 'Show Extensions (Skills)',
            description: 'View skills as extensions',
            icon: <Palette size={16} />,
            category: 'View',
            shortcut: 'Ctrl+Shift+X',
            action: () => { setActiveSidebarPanel('extensions'); onClose(); }
        },

        // Actions
        {
            id: 'open-github',
            label: 'Open GitHub Profile',
            description: 'Visit my GitHub',
            icon: <Github size={16} />,
            category: 'External',
            action: () => { window.open('https://github.com/Swaroop-K-S', '_blank'); onClose(); }
        },
        {
            id: 'open-linkedin',
            label: 'Open LinkedIn Profile',
            description: 'Connect on LinkedIn',
            icon: <Linkedin size={16} />,
            category: 'External',
            action: () => { window.open('https://linkedin.com/in/swaroop-ks', '_blank'); onClose(); }
        },
        {
            id: 'download-resume',
            label: 'Download Resume',
            description: 'Get my resume PDF',
            icon: <Download size={16} />,
            category: 'External',
            action: () => { alert('Resume download would start here!'); onClose(); }
        },
        {
            id: 'send-email',
            label: 'Send Email',
            description: 'Compose email to me',
            icon: <Mail size={16} />,
            category: 'External',
            action: () => {
                const subject = encodeURIComponent("Hello Swaroop - Let's Connect!");
                const body = encodeURIComponent("Hi Swaroop,\n\nI came across your portfolio and I'm impressed!\n\nBest regards,\n[Your Name]");
                window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=swaroopkudlurs@gmail.com&su=${subject}&body=${body}`, '_blank');
                onClose();
            }
        },

        // Help
        {
            id: 'open-getting-started',
            label: 'Getting Started',
            description: 'How to use this portfolio',
            icon: <HelpCircle size={16} />,
            category: 'Help',
            action: () => openFile('getting-started.md', 'getting-started.md', 'md')
        },
        {
            id: 'open-shortcuts',
            label: 'Keyboard Shortcuts',
            description: 'View all keyboard shortcuts',
            icon: <Keyboard size={16} />,
            category: 'Help',
            shortcut: 'Ctrl+K Ctrl+S',
            action: () => openFile('keyboard-shortcuts.md', 'keyboard-shortcuts.md', 'md')
        },
        {
            id: 'open-terminal-commands',
            label: 'Terminal Commands',
            description: 'View all terminal commands',
            icon: <Terminal size={16} />,
            category: 'Help',
            action: () => openFile('terminal-commands.md', 'terminal-commands.md', 'md')
        },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.description?.toLowerCase().includes(query.toLowerCase()) ||
        cmd.category.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredCommands.length - 1 ? prev + 1 : prev
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
            } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
                filteredCommands[selectedIndex].action();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex, onClose]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    if (!isOpen) return null;

    // Group commands by category
    const groupedCommands: Record<string, Command[]> = {};
    filteredCommands.forEach(cmd => {
        if (!groupedCommands[cmd.category]) {
            groupedCommands[cmd.category] = [];
        }
        groupedCommands[cmd.category].push(cmd);
    });

    let globalIndex = 0;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[10%]"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Command Palette */}
            <div
                className="relative w-[650px] max-w-[90vw] rounded-lg shadow-2xl overflow-hidden"
                style={{
                    background: 'var(--vscode-sidebar-bg)',
                    border: '1px solid var(--vscode-border)'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="flex items-center gap-2 p-3 border-b" style={{ borderColor: 'var(--vscode-border)' }}>
                    <ChevronRight size={16} style={{ color: 'var(--vscode-accent)' }} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type a command or search..."
                        className="flex-1 bg-transparent outline-none text-sm"
                        style={{ color: 'var(--vscode-text)' }}
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="p-1 hover:bg-[var(--vscode-hover)] rounded"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Results */}
                <div className="max-h-[400px] overflow-y-auto">
                    {Object.keys(groupedCommands).length === 0 ? (
                        <div className="p-4 text-center text-sm" style={{ color: 'var(--vscode-text-muted)' }}>
                            No commands found matching &quot;{query}&quot;
                        </div>
                    ) : (
                        Object.entries(groupedCommands).map(([category, cmds]) => (
                            <div key={category}>
                                <div
                                    className="px-3 py-2 text-xs font-medium uppercase tracking-wider"
                                    style={{ color: 'var(--vscode-text-muted)', background: 'var(--vscode-editor-bg)' }}
                                >
                                    {category}
                                </div>
                                {cmds.map((cmd) => {
                                    const currentIndex = globalIndex++;
                                    return (
                                        <div
                                            key={cmd.id}
                                            className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors ${currentIndex === selectedIndex ? 'bg-[var(--vscode-selection)]' : 'hover:bg-[var(--vscode-list-hover)]'
                                                }`}
                                            onClick={() => cmd.action()}
                                            onMouseEnter={() => setSelectedIndex(currentIndex)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span style={{ color: 'var(--vscode-accent)' }}>{cmd.icon}</span>
                                                <div>
                                                    <div className="text-sm" style={{ color: 'var(--vscode-text)' }}>
                                                        {cmd.label}
                                                    </div>
                                                    {cmd.description && (
                                                        <div className="text-xs" style={{ color: 'var(--vscode-text-muted)' }}>
                                                            {cmd.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {cmd.shortcut && (
                                                <kbd
                                                    className="px-2 py-1 rounded text-xs"
                                                    style={{ background: 'var(--vscode-editor-bg)', color: 'var(--vscode-text-muted)' }}
                                                >
                                                    {cmd.shortcut}
                                                </kbd>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div
                    className="flex items-center justify-between px-3 py-2 text-xs border-t"
                    style={{ borderColor: 'var(--vscode-border)', color: 'var(--vscode-text-muted)' }}
                >
                    <span>↑↓ to navigate</span>
                    <span>↵ to select</span>
                    <span>esc to close</span>
                </div>
            </div>
        </div>
    );
}
