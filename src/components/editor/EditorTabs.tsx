'use client';

import React from 'react';
import { useVSCode } from '@/context/VSCodeContext';
import { X, FileCode, FileJson, FileText } from 'lucide-react';

function getTabIcon(icon: string) {
    switch (icon) {
        case 'tsx':
        case 'ts':
            return <FileCode size={14} className="text-blue-400" />;
        case 'json':
            return <FileJson size={14} className="text-yellow-400" />;
        case 'md':
            return <FileText size={14} className="text-white" />;
        case 'welcome':
            return <span className="text-sm">👋</span>;
        default:
            return <FileText size={14} />;
    }
}

export default function EditorTabs() {
    const { openTabs, activeTabId, setActiveTab, closeTab } = useVSCode();

    return (
        <div
            className="flex h-[35px] overflow-x-auto overflow-y-hidden flex-shrink-0"
            style={{ background: 'var(--vscode-tab-inactive-bg)' }}
        >
            {openTabs.map(tab => (
                <div
                    key={tab.id}
                    className={`tab ${activeTabId === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {getTabIcon(tab.icon)}
                    <span className="truncate">{tab.name}</span>
                    <button
                        className="tab-close ml-auto"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeTab(tab.id);
                        }}
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
        </div>
    );
}
