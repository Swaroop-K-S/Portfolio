'use client';

import React from 'react';
import { useVSCode, Tab } from '@/context/VSCodeContext';
import {
    ChevronRight,
    ChevronDown,
    Folder,
    FolderOpen,
    FileCode,
    FileJson,
    FileText,
    Image,
    HelpCircle
} from 'lucide-react';

interface FileItem {
    id: string;
    name: string;
    type: 'file' | 'folder';
    children?: FileItem[];
    extension?: string;
    content?: string;
}

const portfolioFiles: FileItem[] = [
    {
        id: 'portfolio',
        name: 'PORTFOLIO',
        type: 'folder',
        children: [
            {
                id: 'help',
                name: '📚 help',
                type: 'folder',
                children: [
                    { id: 'getting-started.md', name: 'getting-started.md', type: 'file', extension: 'md' },
                    { id: 'terminal-commands.md', name: 'terminal-commands.md', type: 'file', extension: 'md' },
                    { id: 'keyboard-shortcuts.md', name: 'keyboard-shortcuts.md', type: 'file', extension: 'md' },
                ]
            },
            {
                id: 'src',
                name: 'src',
                type: 'folder',
                children: [
                    {
                        id: 'about',
                        name: 'about',
                        type: 'folder',
                        children: [
                            { id: 'about.tsx', name: 'About.tsx', type: 'file', extension: 'tsx' },
                            { id: 'skills.json', name: 'skills.json', type: 'file', extension: 'json' },
                        ]
                    },
                    {
                        id: 'projects',
                        name: 'projects',
                        type: 'folder',
                        children: [
                            { id: 'project1.tsx', name: 'Project1.tsx', type: 'file', extension: 'tsx' },
                            { id: 'project2.tsx', name: 'Project2.tsx', type: 'file', extension: 'tsx' },
                            { id: 'project3.tsx', name: 'Project3.tsx', type: 'file', extension: 'tsx' },
                        ]
                    },
                    {
                        id: 'experience',
                        name: 'experience',
                        type: 'folder',
                        children: [
                            { id: 'experience.tsx', name: 'Experience.tsx', type: 'file', extension: 'tsx' },
                            { id: 'timeline.json', name: 'timeline.json', type: 'file', extension: 'json' },
                        ]
                    },
                    {
                        id: 'contact',
                        name: 'contact',
                        type: 'folder',
                        children: [
                            { id: 'contact.tsx', name: 'Contact.tsx', type: 'file', extension: 'tsx' },
                        ]
                    },
                ]
            },
            { id: 'readme.md', name: 'README.md', type: 'file', extension: 'md' },
            { id: 'package.json', name: 'package.json', type: 'file', extension: 'json' },
            { id: 'resume.pdf', name: 'resume.pdf', type: 'file', extension: 'pdf' },
        ]
    }
];

function getFileIcon(extension?: string, id?: string) {
    // Special icon for help files
    if (id?.includes('help') || id?.includes('getting-started') || id?.includes('terminal-commands') || id?.includes('keyboard-shortcuts')) {
        return <HelpCircle size={16} className="text-green-400" />;
    }

    switch (extension) {
        case 'tsx':
        case 'ts':
            return <FileCode size={16} className="text-blue-400" />;
        case 'json':
            return <FileJson size={16} className="text-yellow-400" />;
        case 'md':
            return <FileText size={16} className="text-white" />;
        case 'pdf':
            return <FileText size={16} className="text-red-400" />;
        case 'png':
        case 'jpg':
        case 'svg':
            return <Image size={16} className="text-purple-400" />;
        default:
            return <FileText size={16} />;
    }
}

interface TreeNodeProps {
    item: FileItem;
    depth: number;
}

function TreeNode({ item, depth }: TreeNodeProps) {
    const { expandedFolders, toggleFolder, selectedFile, setSelectedFile, openTab } = useVSCode();
    const isExpanded = expandedFolders.has(item.id);
    const isSelected = selectedFile === item.id;

    const handleClick = () => {
        if (item.type === 'folder') {
            toggleFolder(item.id);
        } else {
            setSelectedFile(item.id);
            const tab: Tab = {
                id: item.id,
                name: item.name,
                icon: item.extension || 'file',
                type: 'file',
                path: item.id,
            };
            openTab(tab);
        }
    };

    return (
        <div>
            <div
                className={`tree-item ${isSelected ? 'selected' : ''}`}
                style={{ paddingLeft: depth * 12 + 8 }}
                onClick={handleClick}
            >
                {item.type === 'folder' ? (
                    <>
                        {isExpanded ? (
                            <ChevronDown size={16} className="flex-shrink-0" />
                        ) : (
                            <ChevronRight size={16} className="flex-shrink-0" />
                        )}
                        {item.id === 'help' ? (
                            <HelpCircle size={16} className="text-green-400 flex-shrink-0" />
                        ) : isExpanded ? (
                            <FolderOpen size={16} className="text-yellow-500 flex-shrink-0" />
                        ) : (
                            <Folder size={16} className="text-yellow-500 flex-shrink-0" />
                        )}
                    </>
                ) : (
                    <>
                        <span className="w-4" />
                        {getFileIcon(item.extension, item.id)}
                    </>
                )}
                <span className="truncate ml-1">{item.name}</span>
            </div>

            {item.type === 'folder' && isExpanded && item.children && (
                <div>
                    {item.children.map(child => (
                        <TreeNode key={child.id} item={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function FileExplorer() {
    return (
        <div className="py-1">
            {portfolioFiles.map(item => (
                <TreeNode key={item.id} item={item} depth={0} />
            ))}
        </div>
    );
}
