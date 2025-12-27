'use client';

import React from 'react';
import { useVSCode } from '@/context/VSCodeContext';
import {
    GitBranch,
    AlertCircle,
    Bell,
    CheckCircle,
    Radio
} from 'lucide-react';

export default function StatusBar() {
    const { terminalVisible, setTerminalVisible } = useVSCode();

    return (
        <div
            className="flex items-center justify-between h-[22px] px-2"
            style={{ background: 'var(--vscode-statusbar-bg)' }}
        >
            {/* Left Side */}
            <div className="flex items-center h-full">
                <div className="status-item" title="main branch">
                    <GitBranch size={14} />
                    <span>main</span>
                </div>

                <div className="status-item" title="No Problems">
                    <AlertCircle size={14} />
                    <span>0</span>
                    <AlertCircle size={14} />
                    <span>0</span>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center h-full">
                <div className="status-item">
                    <span>Ln 1, Col 1</span>
                </div>

                <div className="status-item">
                    <span>Spaces: 2</span>
                </div>

                <div className="status-item">
                    <span>UTF-8</span>
                </div>

                <div className="status-item">
                    <span>TypeScript React</span>
                </div>

                <div
                    className="status-item"
                    onClick={() => setTerminalVisible(!terminalVisible)}
                    title="Toggle Terminal"
                >
                    <Radio size={14} />
                    <span>Terminal</span>
                </div>

                <div className="status-item" title="Notifications">
                    <Bell size={14} />
                </div>
            </div>
        </div>
    );
}
