'use client';

import React, { useState, useEffect } from 'react';
import { VSCodeProvider } from '@/context/VSCodeContext';
import MenuBar from '@/components/layout/MenuBar';
import ActivityBar from '@/components/layout/ActivityBar';
import Sidebar from '@/components/layout/Sidebar';
import EditorArea from '@/components/editor/EditorArea';
import Terminal from '@/components/terminal/Terminal';
import StatusBar from '@/components/layout/StatusBar';
import CommandPalette from '@/components/layout/CommandPalette';
import { useVSCode } from '@/context/VSCodeContext';

function VSCodeLayoutInner() {
    const {
        activeSidebarPanel,
        terminalVisible,
        sidebarWidth,
        terminalHeight,
        setTerminalVisible,
        setActiveSidebarPanel
    } = useVSCode();

    const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

    // Global keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+Shift+P - Command Palette
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
                e.preventDefault();
                setCommandPaletteOpen(true);
            }
            // Ctrl+` - Toggle Terminal
            else if ((e.ctrlKey || e.metaKey) && e.key === '`') {
                e.preventDefault();
                setTerminalVisible(!terminalVisible);
            }
            // Ctrl+Shift+E - Show Explorer
            else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {
                e.preventDefault();
                setActiveSidebarPanel('explorer');
            }
            // Ctrl+Shift+F - Show Search
            else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
                e.preventDefault();
                setActiveSidebarPanel('search');
            }
            // Ctrl+Shift+G - Show Git
            else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'G') {
                e.preventDefault();
                setActiveSidebarPanel('git');
            }
            // Ctrl+Shift+X - Show Extensions
            else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'X') {
                e.preventDefault();
                setActiveSidebarPanel('extensions');
            }
            // Ctrl+B - Toggle Sidebar
            else if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                setActiveSidebarPanel(activeSidebarPanel === 'none' ? 'explorer' : 'none');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [terminalVisible, activeSidebarPanel, setTerminalVisible, setActiveSidebarPanel]);

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden" style={{ background: 'var(--vscode-bg)' }}>
            {/* Menu Bar */}
            <MenuBar />

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Activity Bar */}
                <ActivityBar />

                {/* Sidebar */}
                {activeSidebarPanel !== 'none' && (
                    <div style={{ width: sidebarWidth, background: 'var(--vscode-sidebar-bg)' }} className="flex-shrink-0 overflow-hidden">
                        <Sidebar />
                    </div>
                )}

                {/* Editor + Terminal Area */}
                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Editor Area */}
                    <div className="flex-1 overflow-hidden" style={{ height: terminalVisible ? `calc(100% - ${terminalHeight}px)` : '100%' }}>
                        <EditorArea />
                    </div>

                    {/* Terminal */}
                    {terminalVisible && (
                        <div style={{ height: terminalHeight, background: 'var(--vscode-terminal-bg)' }} className="flex-shrink-0">
                            <Terminal />
                        </div>
                    )}
                </div>
            </div>

            {/* Status Bar */}
            <StatusBar />

            {/* Command Palette */}
            <CommandPalette
                isOpen={commandPaletteOpen}
                onClose={() => setCommandPaletteOpen(false)}
            />
        </div>
    );
}

export default function VSCodeLayout() {
    return (
        <VSCodeProvider>
            <VSCodeLayoutInner />
        </VSCodeProvider>
    );
}
