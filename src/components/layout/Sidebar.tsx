'use client';

import React from 'react';
import { useVSCode } from '@/context/VSCodeContext';
import FileExplorer from '@/components/sidebar/FileExplorer';
import SearchPanel from '@/components/sidebar/SearchPanel';
import GitPanel from '@/components/sidebar/GitPanel';
import ExtensionsPanel from '@/components/sidebar/ExtensionsPanel';

export default function Sidebar() {
    const { activeSidebarPanel } = useVSCode();

    const renderPanel = () => {
        switch (activeSidebarPanel) {
            case 'explorer':
                return <FileExplorer />;
            case 'search':
                return <SearchPanel />;
            case 'git':
                return <GitPanel />;
            case 'extensions':
                return <ExtensionsPanel />;
            default:
                return null;
        }
    };

    const getPanelTitle = () => {
        switch (activeSidebarPanel) {
            case 'explorer':
                return 'EXPLORER';
            case 'search':
                return 'SEARCH';
            case 'git':
                return 'SOURCE CONTROL';
            case 'extensions':
                return 'EXTENSIONS';
            default:
                return '';
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Panel Header */}
            <div className="sidebar-header">
                {getPanelTitle()}
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {renderPanel()}
            </div>
        </div>
    );
}
