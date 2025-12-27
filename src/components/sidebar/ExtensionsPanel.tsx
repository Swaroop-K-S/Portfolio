'use client';

import React, { useState } from 'react';
import { Search, Download, Check, Star, Settings } from 'lucide-react';

interface Extension {
    id: string;
    name: string;
    publisher: string;
    description: string;
    icon: string;
    iconBg: string;
    downloads: string;
    rating: number;
    installed: boolean;
}

const extensions: Extension[] = [
    {
        id: 'react',
        name: 'React',
        publisher: 'Facebook',
        description: 'A JavaScript library for building user interfaces',
        icon: '⚛️',
        iconBg: '#61DAFB20',
        downloads: '15.2M',
        rating: 4.9,
        installed: true,
    },
    {
        id: 'nextjs',
        name: 'Next.js',
        publisher: 'Vercel',
        description: 'The React Framework for Production',
        icon: '▲',
        iconBg: '#00000040',
        downloads: '8.5M',
        rating: 4.8,
        installed: true,
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        publisher: 'Microsoft',
        description: 'Typed superset of JavaScript that compiles to plain JavaScript',
        icon: 'TS',
        iconBg: '#3178C620',
        downloads: '25.1M',
        rating: 4.9,
        installed: true,
    },
    {
        id: 'tailwind',
        name: 'Tailwind CSS',
        publisher: 'Tailwind Labs',
        description: 'A utility-first CSS framework for rapid UI development',
        icon: '🌊',
        iconBg: '#38BDF820',
        downloads: '12.3M',
        rating: 4.7,
        installed: true,
    },
    {
        id: 'nodejs',
        name: 'Node.js',
        publisher: 'OpenJS',
        description: 'JavaScript runtime built on Chrome V8 engine',
        icon: '🟢',
        iconBg: '#33993320',
        downloads: '20.5M',
        rating: 4.8,
        installed: true,
    },
    {
        id: 'git',
        name: 'Git',
        publisher: 'Git SCM',
        description: 'Distributed version control system',
        icon: '🔀',
        iconBg: '#F0503220',
        downloads: '30.2M',
        rating: 4.9,
        installed: true,
    },
    {
        id: 'docker',
        name: 'Docker',
        publisher: 'Docker Inc',
        description: 'Container platform for building and shipping apps',
        icon: '🐳',
        iconBg: '#2496ED20',
        downloads: '10.1M',
        rating: 4.6,
        installed: true,
    },
    {
        id: 'postgresql',
        name: 'PostgreSQL',
        publisher: 'PostgreSQL',
        description: 'Powerful open source object-relational database',
        icon: '🐘',
        iconBg: '#33679120',
        downloads: '8.9M',
        rating: 4.7,
        installed: true,
    },
    {
        id: 'aws',
        name: 'AWS',
        publisher: 'Amazon',
        description: 'Cloud computing services and APIs',
        icon: '☁️',
        iconBg: '#FF990020',
        downloads: '15.8M',
        rating: 4.5,
        installed: false,
    },
    {
        id: 'graphql',
        name: 'GraphQL',
        publisher: 'GraphQL Foundation',
        description: 'Query language for APIs',
        icon: '◈',
        iconBg: '#E10098',
        downloads: '6.2M',
        rating: 4.6,
        installed: false,
    },
];

export default function ExtensionsPanel() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'installed' | 'recommended'>('installed');

    const filteredExtensions = extensions.filter(ext => {
        const matchesSearch = ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ext.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'installed' ? ext.installed : !ext.installed;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex flex-col h-full">
            {/* Search Input */}
            <div className="p-2">
                <div className="relative">
                    <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2" style={{ color: 'var(--vscode-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search Extensions"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input pl-7"
                    />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b" style={{ borderColor: 'var(--vscode-border)' }}>
                <button
                    className={`flex-1 py-2 text-xs font-medium transition-colors ${filter === 'installed' ? 'border-b-2' : ''
                        }`}
                    style={{
                        borderColor: filter === 'installed' ? 'var(--vscode-accent)' : 'transparent',
                        color: filter === 'installed' ? 'var(--vscode-text)' : 'var(--vscode-text-muted)'
                    }}
                    onClick={() => setFilter('installed')}
                >
                    INSTALLED ({extensions.filter(e => e.installed).length})
                </button>
                <button
                    className={`flex-1 py-2 text-xs font-medium transition-colors ${filter === 'recommended' ? 'border-b-2' : ''
                        }`}
                    style={{
                        borderColor: filter === 'recommended' ? 'var(--vscode-accent)' : 'transparent',
                        color: filter === 'recommended' ? 'var(--vscode-text)' : 'var(--vscode-text-muted)'
                    }}
                    onClick={() => setFilter('recommended')}
                >
                    RECOMMENDED
                </button>
            </div>

            {/* Extensions List */}
            <div className="flex-1 overflow-y-auto">
                {filteredExtensions.map(ext => (
                    <div key={ext.id} className="extension-card">
                        <div
                            className="extension-icon flex-shrink-0"
                            style={{ background: ext.iconBg }}
                        >
                            {ext.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-medium truncate">{ext.name}</span>
                                {ext.installed && (
                                    <Check size={12} className="text-green-400 flex-shrink-0" />
                                )}
                            </div>
                            <div className="text-xs truncate" style={{ color: 'var(--vscode-text-muted)' }}>
                                {ext.publisher}
                            </div>
                            <div className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--vscode-text-muted)' }}>
                                {ext.description}
                            </div>
                            <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: 'var(--vscode-text-muted)' }}>
                                <span className="flex items-center gap-0.5">
                                    <Download size={10} />
                                    {ext.downloads}
                                </span>
                                <span className="flex items-center gap-0.5">
                                    <Star size={10} className="text-yellow-400" />
                                    {ext.rating}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
