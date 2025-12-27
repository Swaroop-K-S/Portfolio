'use client';

import React from 'react';
import { useVSCode, SidebarPanel } from '@/context/VSCodeContext';
import {
    Files,
    Search,
    GitBranch,
    Blocks,
    Settings,
    User
} from 'lucide-react';

interface ActivityItemProps {
    icon: React.ReactNode;
    panel: SidebarPanel;
    tooltip: string;
}

function ActivityItem({ icon, panel, tooltip }: ActivityItemProps) {
    const { activeSidebarPanel, setActiveSidebarPanel } = useVSCode();
    const isActive = activeSidebarPanel === panel;

    const handleClick = () => {
        if (isActive) {
            setActiveSidebarPanel('none');
        } else {
            setActiveSidebarPanel(panel);
        }
    };

    return (
        <div
            className={`activity-icon ${isActive ? 'active' : ''}`}
            onClick={handleClick}
            title={tooltip}
        >
            {icon}
        </div>
    );
}

export default function ActivityBar() {
    return (
        <div
            className="flex flex-col justify-between h-full w-[48px] flex-shrink-0"
            style={{ background: 'var(--vscode-activitybar-bg)' }}
        >
            {/* Top Icons */}
            <div className="flex flex-col">
                <ActivityItem
                    icon={<Files size={24} />}
                    panel="explorer"
                    tooltip="Explorer (Ctrl+Shift+E)"
                />
                <ActivityItem
                    icon={<Search size={24} />}
                    panel="search"
                    tooltip="Search (Ctrl+Shift+F)"
                />
                <ActivityItem
                    icon={<GitBranch size={24} />}
                    panel="git"
                    tooltip="Source Control (Ctrl+Shift+G)"
                />
                <ActivityItem
                    icon={<Blocks size={24} />}
                    panel="extensions"
                    tooltip="Extensions (Ctrl+Shift+X)"
                />
            </div>

            {/* Bottom Icons */}
            <div className="flex flex-col">
                <div className="activity-icon" title="Accounts">
                    <User size={24} />
                </div>
                <div className="activity-icon" title="Manage">
                    <Settings size={24} />
                </div>
            </div>
        </div>
    );
}
