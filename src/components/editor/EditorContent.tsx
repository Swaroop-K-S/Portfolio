'use client';

import React from 'react';
import { useVSCode } from '@/context/VSCodeContext';
import WelcomeTab from './tabs/WelcomeTab';
import AboutTab from './tabs/AboutTab';
import ProjectsTab from './tabs/ProjectsTab';
import ContactTab from './tabs/ContactTab';
import ExperienceTab from './tabs/ExperienceTab';
import SkillsTab from './tabs/SkillsTab';
import ReadmeTab from './tabs/ReadmeTab';
import GettingStartedTab from './tabs/GettingStartedTab';
import TerminalCommandsTab from './tabs/TerminalCommandsTab';
import KeyboardShortcutsTab from './tabs/KeyboardShortcutsTab';

export default function EditorContent() {
    const { openTabs, activeTabId } = useVSCode();
    const activeTab = openTabs.find(tab => tab.id === activeTabId);

    if (!activeTab) {
        return null;
    }

    const renderContent = () => {
        switch (activeTab.id) {
            case 'welcome':
                return <WelcomeTab />;
            case 'about.tsx':
                return <AboutTab />;
            case 'skills.json':
                return <SkillsTab />;
            case 'project1.tsx':
            case 'project2.tsx':
            case 'project3.tsx':
                return <ProjectsTab projectId={activeTab.id} />;
            case 'experience.tsx':
            case 'timeline.json':
                return <ExperienceTab />;
            case 'contact.tsx':
                return <ContactTab />;
            case 'readme.md':
                return <ReadmeTab />;
            // Help files
            case 'getting-started.md':
                return <GettingStartedTab />;
            case 'terminal-commands.md':
                return <TerminalCommandsTab />;
            case 'keyboard-shortcuts.md':
                return <KeyboardShortcutsTab />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p style={{ color: 'var(--vscode-text-muted)' }}>
                            Content for {activeTab.name}
                        </p>
                    </div>
                );
        }
    };

    // Get the correct path for breadcrumb
    const getBreadcrumb = () => {
        if (activeTab.id.includes('getting-started') || activeTab.id.includes('terminal-commands') || activeTab.id.includes('keyboard-shortcuts')) {
            return ['portfolio', 'help', activeTab.name];
        }
        return ['portfolio', 'src', activeTab.name];
    };

    const breadcrumbPath = getBreadcrumb();

    return (
        <div className="flex-1 overflow-auto">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                {breadcrumbPath.map((item, index) => (
                    <React.Fragment key={index}>
                        <span>{item}</span>
                        {index < breadcrumbPath.length - 1 && <span>/</span>}
                    </React.Fragment>
                ))}
            </div>

            {/* Content */}
            <div className="h-full">
                {renderContent()}
            </div>
        </div>
    );
}
