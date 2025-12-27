'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useVSCode, Tab } from '@/context/VSCodeContext';
import { Search, FileCode, FileJson, FileText, X } from 'lucide-react';

interface FileItem {
    id: string;
    name: string;
    path: string;
    extension: string;
}

const allFiles: FileItem[] = [
    { id: 'about.tsx', name: 'About.tsx', path: 'src/about/About.tsx', extension: 'tsx' },
    { id: 'skills.json', name: 'skills.json', path: 'src/about/skills.json', extension: 'json' },
    { id: 'project1.tsx', name: 'Project1.tsx', path: 'src/projects/Project1.tsx', extension: 'tsx' },
    { id: 'project2.tsx', name: 'Project2.tsx', path: 'src/projects/Project2.tsx', extension: 'tsx' },
    { id: 'project3.tsx', name: 'Project3.tsx', path: 'src/projects/Project3.tsx', extension: 'tsx' },
    { id: 'experience.tsx', name: 'Experience.tsx', path: 'src/experience/Experience.tsx', extension: 'tsx' },
    { id: 'timeline.json', name: 'timeline.json', path: 'src/experience/timeline.json', extension: 'json' },
    { id: 'contact.tsx', name: 'Contact.tsx', path: 'src/contact/Contact.tsx', extension: 'tsx' },
    { id: 'readme.md', name: 'README.md', path: 'README.md', extension: 'md' },
    { id: 'package.json', name: 'package.json', path: 'package.json', extension: 'json' },
];

function getFileIcon(extension: string) {
    switch (extension) {
        case 'tsx':
        case 'ts':
            return <FileCode size={16} className="text-blue-400" />;
        case 'json':
            return <FileJson size={16} className="text-yellow-400" />;
        case 'md':
            return <FileText size={16} className="text-white" />;
        default:
            return <FileText size={16} />;
    }
}

interface QuickSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickSearch({ isOpen, onClose }: QuickSearchProps) {
    const { openTab, setSelectedFile } = useVSCode();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredFiles = allFiles.filter(file =>
        file.name.toLowerCase().includes(query.toLowerCase()) ||
        file.path.toLowerCase().includes(query.toLowerCase())
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
                    prev < filteredFiles.length - 1 ? prev + 1 : prev
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
            } else if (e.key === 'Enter' && filteredFiles[selectedIndex]) {
                handleFileSelect(filteredFiles[selectedIndex]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredFiles, selectedIndex, onClose]);

    // Reset selected index when filtered results change
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    const handleFileSelect = (file: FileItem) => {
        const tab: Tab = {
            id: file.id,
            name: file.name,
            icon: file.extension,
            type: 'file',
            path: file.id,
        };
        openTab(tab);
        setSelectedFile(file.id);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15%]"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Search Modal */}
            <div
                className="relative w-[600px] max-w-[90vw] rounded-lg shadow-2xl overflow-hidden"
                style={{
                    background: 'var(--vscode-sidebar-bg)',
                    border: '1px solid var(--vscode-border)'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="flex items-center gap-2 p-3 border-b" style={{ borderColor: 'var(--vscode-border)' }}>
                    <Search size={18} style={{ color: 'var(--vscode-text-muted)' }} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search files by name..."
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
                <div className="max-h-[300px] overflow-y-auto">
                    {filteredFiles.length === 0 ? (
                        <div className="p-4 text-center text-sm" style={{ color: 'var(--vscode-text-muted)' }}>
                            No files found matching &quot;{query}&quot;
                        </div>
                    ) : (
                        filteredFiles.map((file, index) => (
                            <div
                                key={file.id}
                                className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors ${index === selectedIndex ? 'bg-[var(--vscode-selection)]' : 'hover:bg-[var(--vscode-list-hover)]'
                                    }`}
                                onClick={() => handleFileSelect(file)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                {getFileIcon(file.extension)}
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm truncate" style={{ color: 'var(--vscode-text)' }}>
                                        {file.name}
                                    </div>
                                    <div className="text-xs truncate" style={{ color: 'var(--vscode-text-muted)' }}>
                                        {file.path}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Hint */}
                <div
                    className="flex items-center justify-between px-3 py-2 text-xs border-t"
                    style={{ borderColor: 'var(--vscode-border)', color: 'var(--vscode-text-muted)' }}
                >
                    <span>↑↓ to navigate</span>
                    <span>↵ to open</span>
                    <span>esc to close</span>
                </div>
            </div>
        </div>
    );
}
